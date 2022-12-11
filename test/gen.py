import yaml
import os
import json
import string
import random

class Genarator:
    def __init__(self):
        path = os.path.dirname(os.path.abspath(__file__))
        self.blocks_path = os.path.join(path, 'blocks')

        self.blocks = {}

        self.variable_types = {'Integer' : 'int', 'Float' : 'float'}

        self.load_blocks()

    def generate_variables(self, variables):
        for variable in variables:
            self.variables[variable['id']] = {'name' : variable['name'], 'type' : variable['type']}
            self.global_variable.append("{variable_type} {variable_name} = 0;".format(variable_type=self.variable_types[variable['type']], variable_name=variable['name']))

    def load_blocks(self):
        for filename in os.listdir(self.blocks_path):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                print(filename)
                with open(os.path.join(self.blocks_path, filename)) as f:
                    data = yaml.load(f, Loader=yaml.FullLoader)
                    for name in data:
                        self.blocks[name] = data[name]
        print(json.dumps(self.blocks, indent=2))

    def add_event_handler(self, event_handler, name):
        block_definition = self.blocks[name]
        if(event_handler not in self.event_handlers):
            self.event_handlers[event_handler] = {}
        for event in block_definition['handler']['events']['enum']:
            full_event_name = block_definition['handler']['events']['prefix'] + event
            if(full_event_name not in self.event_handlers):
                self.event_handlers[event_handler][full_event_name] = []
                if(block_definition['handler']['events']['enum'][event]):
                    for code in block_definition['handler']['events']['enum'][event]:
                        self.event_handlers[event_handler][full_event_name].append(code)

    def generate_code(self, data):

        self.global_variable = []
        self.variables = {}
        self.application_init = []
        self.application_task = []
        self.event_handlers = {}

        self.generate_variables(data['variables'])

        for block in data['blocks']['blocks']:
            if block['type'] == 'hio_application_initialize':
                self.next(block['inputs']['BLOCKS'])

        for block in data['blocks']['blocks']:
            print(block['type'])
            if block['type'] == 'hio_application_task':
                self.application_init.append('twr_scheduler_plan_from_now(0, {TASK_INTERVAL});'.format(**block['fields']))
                self.next(block['inputs']['BLOCKS'], 'application_task')
                self.application_task.append('twr_scheduler_plan_current_relative({TASK_INTERVAL});'.format(**block['fields']))
            if 'event' in block['type']:
                print(self.event_handlers)
                name = block['type'][len('hio_'):(len(block['type']) - len('_event'))]
                full_event_name = self.blocks[name]['handler']['events']['prefix'] + block['fields']['NAME']
                self.next(block['inputs']['BLOCKS'], self.event_handlers[name + '_handler'][full_event_name])
            print('#')

        print('global_variable', self.global_variable)
        print('application_init', self.application_init)
        print('application_task', self.application_task)
        print('event_handlers', self.event_handlers)

        self.print_code()
    
    def print_code(self):
        print('#include <application.h>')
        print('')
        for code in self.global_variable:
            print(code)
        
        print('')

        for event_handler in self.event_handlers:
            name = event_handler[:-(len('_handler'))]
            block_definition = self.blocks[name]
            if block_definition:
                print(block_definition['handler']['declaration'] + ' {')
                index = 0
                for event in self.event_handlers[event_handler]:
                    if(self.event_handlers[event_handler][event] == []):
                        continue
                    if(index == 0):
                        print('\tif (event == {event}) {{'.format(event=event))
                    else:
                        print('\telse if (event == {event}) {{'.format(event=event))
                    for code in self.event_handlers[event_handler][event]:
                        print('\t\t{code}'.format(code=code))
                    print('\t}')
                    index += 1
                print('}')
                print('')

        print('void application_init(void) {')
        for code in self.application_init:
            print('\t{code}'.format(code=code))
        print('}')

        print('')

        print('void application_task(void) {')
        for code in self.application_task:
            print('\t{code}'.format(code=code))
        print('}')

    def next(self, next, event_handler=None, event=None):
        print('next', next)
        if 'block' in next:
            block = next['block']
            if '_initialize' in block['type']:
                name = block['type'][len('hio_'):(len(block['type']) - len('_initialize'))]
                print('initialize', name)
                block_definition = self.blocks[name]
                if block_definition:
                    if 'handler' in block_definition:
                        self.add_event_handler(name + '_handler', name)
                    self.global_variable.extend(block_definition.get('global_variable',[]))
                    random_variable_name = ''.join([random.choice(string.ascii_letters) for n in range(12)])
                    for code in block_definition.get('application_init',[]):
                        if('fields' in block):
                            block['fields']['RANDOM_VARIABLE'] = random_variable_name
                            code = code.format(**block['fields'])
                        self.application_init.append(code)
                    self.application_init.append('')

            else:
                name = block['type'][len('hio_'):]
                action = name[name.find('_') + 1:]
                module = name[:name.find('_')]
                block_definition = self.blocks[module]

                if block_definition:
                    if event_handler == 'application_task':
                        random_variable_name = ''.join([random.choice(string.ascii_letters) for n in range(12)])
                        for code in block_definition['action'][action]:
                            if('fields' in block):
                                if('inputs' in block):
                                    variable=self.variables[block['inputs']['VALUE']['block']['fields']['VAR']['id']]['name']
                                    if(self.variables[block['inputs']['VALUE']['block']['fields']['VAR']['id']]['type'] == 'Integer'):
                                        format_string = '%d'
                                    elif(self.variables[block['inputs']['VALUE']['block']['fields']['VAR']['id']]['type'] == 'Float'):
                                        format_string = '%.1f'
                                    block['fields']['VARIABLE'] = variable
                                    block['fields']['FORMAT_STRING'] = format_string          
                                block['fields']['RANDOM_VARIABLE'] = random_variable_name
                                code = code.format(**block['fields'])
                            self.application_task.append(code)
                        self.application_task.append('')
                    elif(event_handler != None and event_handler != 'application_task'):
                        random_variable_name = ''.join([random.choice(string.ascii_letters) for n in range(12)])
                        for code in block_definition['action'][action]:
                            if('fields' in block):
                                block['fields']['RANDOM_VARIABLE'] = random_variable_name
                                code = code.format(**block['fields'])
                            event_handler.append(code)
                        event_handler.append('')

            if 'next' in block:
                self.next(block['next'], event_handler, event)

def main():
    gen = Genarator()

    with open('data.json') as f:
        data = json.load(f)
    
    gen.generate_code(data)


if __name__ == '__main__':
    main()