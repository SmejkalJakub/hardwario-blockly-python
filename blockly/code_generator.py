import yaml
import os
import json
import string
import random
import subprocess
from git import Repo

class Genarator:
    def __init__(self):
        path = os.path.dirname(os.path.abspath(__file__))
        self.blocks_path = os.path.join(path, 'blocks')

        self.blocks = {}

        self.variable_types = {'Integer' : 'int', 'Float' : 'float'}

        self.indent = 0
        
        self.operators = {
            'logic_operation' : {'AND': '&&', 'OR': '||'}, 
            'logic_compare' : {'EQ': '==', 'NEQ': '!=', 'LT': '<', 'LTE': '<=', 'GT': '>', 'GTE': '>='}, 
            'math_arithmetic' : {'ADD': '+', 'MINUS': '-', 'MULTIPLY': '*', 'DIVIDE': '/'}
            }

        self.load_blocks()

    def generate_loop(self, block, event_handler):
        if(block['type'] == 'controls_repeat_ext'):
            random_variable_name = ''.join([random.choice(string.ascii_letters) for n in range(12)])
            event_handler.append(('\t' * self.indent) + 'for(int {random_variable_name} = 0; {random_variable_name} < ({count}); {random_variable_name}++) {{'.format(random_variable_name=random_variable_name, count=self.generate_sub_section(block['inputs']['TIMES']['block'])))
        elif(block['type'] == 'controls_whileUntil'):
            event_handler.append(('\t' * self.indent) + 'while({condition}) {{'.format(condition=self.generate_sub_section(block['inputs']['BOOL']['block'])))
        elif(block['type'] == 'controls_for'):
            variable = self.variables[block['fields']['VAR']['id']]['name']
            event_handler.append(('\t' * self.indent) + 'for({variable} = ({from_value}); {variable} < ({to}); {variable}+=({by})) {{'.format(variable=variable, from_value=self.generate_sub_section(block['inputs']['FROM']['block']), to=self.generate_sub_section(block['inputs']['TO']['block']), by=self.generate_sub_section(block['inputs']['BY']['block'])))

        self.indent += 1
        self.next(block['inputs']['DO'], event_handler)
        self.indent -= 1

        event_handler.append(('\t' * self.indent) + '}')

    def generate_if_statement(self, block, event_handler):    
        if_index = 0

        if('inputs' not in block):
            return
        for if_statement in block['inputs']:

            if("DO" in if_statement):
                continue

            if(if_index == 0 and "IF" in if_statement):
                if_json = block['inputs']['IF{index}'.format(index=if_index)]['block']
                condition_start = ('\t' * self.indent) + 'if('

                if(if_json['type'] == 'logic_operation' or if_json['type'] == 'logic_compare'):
                    condition = '({left_side}) {operator} ({right_side})'.format(left_side=self.generate_sub_section(if_json['inputs']['A']['block']), operator=self.operators[if_json['type']][if_json['fields']['OP']], right_side=self.generate_sub_section(if_json['inputs']['B']['block']))

                elif(if_json['type'] == 'logic_boolean'):
                    if(if_json['fields']['BOOL'] == 'TRUE'):
                        condition = 'true'
                    elif(if_json['fields']['BOOL'] == 'FALSE'):
                        condition = 'false'
                elif(if_json['type'] == 'logic_negate'):
                    condition = '(!({condition}))'.format(condition=self.generate_sub_section(if_json['inputs']['BOOL']['block']))

                elif(if_json['type'].startswith('hio_') and if_json['type'].endswith('_value')):
                    condition = '({condition})'.format(condition=if_json['type'][4:])
                
                condition_end = ') {'

                event_handler.append(condition_start + condition + condition_end)
               
                if('DO{index}'.format(index=if_index) in block['inputs']):
                    self.indent += 1
                    self.next(block['inputs']['DO{index}'.format(index=if_index)], event_handler)
                    self.indent -= 1
                event_handler.append(('\t' * self.indent) + '}')

            elif(if_statement == 'ELSE'):
                if_json = block['inputs']['ELSE']['block']

                event_handler.append(('\t' * self.indent) + 'else {')

                self.indent += 1
                self.next(block['inputs']['ELSE'], event_handler)
                self.indent -= 1

                event_handler.append(('\t' * self.indent) + '}')

            else:
                if_json = block['inputs']['IF{index}'.format(index=if_index)]['block']

                condition_start = ('\t' * self.indent) + 'else if('

                if(if_json['type'] == 'logic_operation' or if_json['type'] == 'logic_compare'):
                    condition = '({left_side}) {operator} ({right_side})'.format(left_side=self.generate_sub_section(if_json['inputs']['A']['block']), operator=self.operators[if_json['type']][if_json['fields']['OP']], right_side=self.generate_sub_section(if_json['inputs']['B']['block']))

                elif(if_json['type'] == 'logic_boolean'):
                    if(if_json['fields']['BOOL'] == 'TRUE'):
                        condition = 'true'
                    elif(if_json['fields']['BOOL'] == 'FALSE'):
                        condition = 'false'
                elif(if_json['type'] == 'logic_negate'):
                    condition = '(!({condition}))'.format(condition=self.generate_sub_section(if_json['inputs']['BOOL']['block']))

                elif(if_json['type'].startswith('hio_') and if_json['type'].endswith('_value')):
                    condition = '({condition})'.format(condition=if_json['type'][4:])
                
                condition_end = ') {'

                event_handler.append(condition_start + condition + condition_end)
               
                if('DO{index}'.format(index=if_index) in block['inputs']):
                    self.indent += 1
                    self.next(block['inputs']['DO{index}'.format(index=if_index)], event_handler)
                    self.indent -= 1
                event_handler.append(('\t' * self.indent) + '}')

            if(if_statement != 'ELSE'):
                if_index += 1
    
    def generate_sub_section(self, block):
        if(block['type'] == 'logic_compare' or block['type'] == 'logic_operation' or block['type'] == 'math_arithmetic'):
            
            if(block['fields']['OP'] == 'POWER'):
                return 'pow(({left_side}), ({right_side}))'.format(left_side=self.generate_sub_section(block['inputs']['A']['block']), right_side=self.generate_sub_section(block['inputs']['B']['block']))
            else:
                return '({left_side}) {operator} ({right_side})'.format(left_side=self.generate_sub_section(block['inputs']['A']['block']), operator=self.operators[block['type']][block['fields']['OP']], right_side=self.generate_sub_section(block['inputs']['B']['block']))
        
        elif(block['type'] == 'math_number'):
            return block['fields']['NUM']
        elif(block['type'] == 'logic_boolean'):
            if(block['fields']['BOOL'] == 'TRUE'):
                return 'true'
            elif(block['fields']['BOOL'] == 'FALSE'):
                return 'false'
        elif(block['type'] == 'logic_negate'):
            return '(!({condition}))'.format(condition=self.generate_sub_section(block['inputs']['BOOL']['block']))
        elif('variables_get' in block['type']):
            return self.variables[block['fields']['VAR']['id']]['name']
        elif(block['type'].startswith('hio_') and block['type'].endswith('_value')):
            return block['type'][4:]

    def generate_variables(self, variables):
        for variable in variables:
            self.variables[variable['id']] = {'name' : variable['name'], 'type' : variable['type']}
            self.global_variable.append("{variable_type} {variable_name} = 0;".format(variable_type=self.variable_types[variable['type']], variable_name=variable['name']))

    def load_blocks(self):
        for filename in os.listdir(self.blocks_path):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                with open(os.path.join(self.blocks_path, filename)) as f:
                    data = yaml.load(f, Loader=yaml.FullLoader)
                    for name in data:
                        self.blocks[name] = data[name]

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
                        if('}' in code):
                            self.indent -= 1
                        self.event_handlers[event_handler][full_event_name].append(('\t' * self.indent) + code)
                        if('{' in code):
                            self.indent += 1

    def generate_code(self, data):

        self.global_variable = []
        self.variables = {}
        self.application_init = []
        self.application_task = []
        self.event_handlers = {}

        if('variables' in data):
            self.generate_variables(data['variables'])

        for block in data['blocks']['blocks']:
            if block['type'] == 'hio_application_initialize':
                if('inputs' in block):
                    self.indent += 1
                    self.next(block['inputs']['BLOCKS'], self.application_init)

        for block in data['blocks']['blocks']:
            if block['type'] == 'hio_application_task':
                if('inputs' in block):
                    self.indent = 1
                    self.application_init.append('\ttwr_scheduler_plan_from_now(0, {TASK_INTERVAL});'.format(**block['fields']))
                    self.next(block['inputs']['BLOCKS'], self.application_task)
                    self.application_task.append('\ttwr_scheduler_plan_current_relative({TASK_INTERVAL});'.format(**block['fields']))
                self.indent = 0
            if 'event' in block['type']:
                name = block['type'][len('hio_'):(len(block['type']) - len('_event'))]
                full_event_name = self.blocks[name]['handler']['events']['prefix'] + block['fields']['NAME']
                if('inputs' in block):
                    self.indent += 2
                    self.next(block['inputs']['BLOCKS'], self.event_handlers[name + '_handler'][full_event_name])
                self.indent = 0
            print('#')

        #print('global_variable', self.global_variable)
        #print('application_init', self.application_init)
        #print('application_task', self.application_task)
        #print('event_handlers', self.event_handlers)

        return self.print_code()
    
    def print_code(self):
        output = '/*\nThis code was autogenerated, \nit will regenerate with every change in blocks\n*/\n'

        output += '#include <application.h>\n'
        output += '\n'
        for code in self.global_variable:
            output += code + '\n'
        
        output += '\n'

        for event_handler in self.event_handlers:
            name = event_handler[:-(len('_handler'))]
            block_definition = self.blocks[name]
            if block_definition:
                something_in_event = False
                for event in self.event_handlers[event_handler]:
                    if(self.event_handlers[event_handler][event] == []):
                        continue
                    else:
                        something_in_event = True
                        break
                if(something_in_event):
                    output += block_definition['handler']['declaration'] + ' {\n'
                    index = 0
                    for event in self.event_handlers[event_handler]:
                        if(self.event_handlers[event_handler][event] == []):
                            continue
                        if(index == 0):
                            output += '\tif (event == {event}) {{\n'.format(event=event)
                        else:
                            output += '\telse if (event == {event}) {{\n'.format(event=event)
                        for code in self.event_handlers[event_handler][event]:
                            output += '{code}\n'.format(code=code)
                        output += '\t}\n'
                        index += 1
                    output += '}\n'
                    output += '\n'

        output += 'void application_init(void) {\n'
        for code in self.application_init:
            output += '{code}\n'.format(code=code)
        output += '}\n'

        output += '\n'

        if(self.application_task != []):
            output += 'void application_task(void) {\n'
            for code in self.application_task:
                output += '{code}\n'.format(code=code)
            output += '}\n'

        return output

    def next(self, next, event_handler):
        if 'block' in next:
            block = next['block']
            if '_initialize' in block['type']:
                name = block['type'][len('hio_'):(len(block['type']) - len('_initialize'))]
                block_definition = self.blocks[name]
                if block_definition:
                    if 'handler' in block_definition:
                        indent = self.indent
                        self.indent = 2
                        self.add_event_handler(name + '_handler', name)
                        self.indent = indent
                    for code in block_definition.get('global_variable',[]):
                        if('fields' in block):
                            code = code.format(**block['fields'])
                        self.global_variable.append(code)
                    random_variable_name = ''.join([random.choice(string.ascii_letters) for n in range(12)])
                    for code in block_definition['application_init']['code']:
                        if('fields' in block):
                            block['fields']['RANDOM_VARIABLE'] = random_variable_name
                            code = code.format(**block['fields'])
                        self.application_init.append(('\t' * self.indent) + code)
                    self.application_init.append('')

            else:
                name = block['type'][len('hio_'):]
                action = name[name.find('_') + 1:]
                module = name[:name.find('_')]
                try:
                    block_definition = self.blocks[module]
                except:
                    block_definition = None

                if block_definition:
                    random_variable_name = ''.join([random.choice(string.ascii_letters) for n in range(12)])
                    for code in block_definition['action'][action]['code']:
                        if('fields' in block):
                            if('inputs' in block):
                                for input in block['inputs']:
                                    block['fields'][input] = self.generate_sub_section(block['inputs'][input]['block'])
                                #variable=self.variables[block['inputs']['VALUE']['block']['fields']['VAR']['id']]['name']
                                #if(self.variables[block['inputs']['VALUE']['block']['fields']['VAR']['id']]['type'] == 'Integer'):
                                #    format_string = '%d'
                                #elif(self.variables[block['inputs']['VALUE']['block']['fields']['VAR']['id']]['type'] == 'Float'):
                                #    format_string = '%.1f'
                                #block['fields']['VARIABLE'] = variable
                                #block['fields']['FORMAT_STRING'] = format_string          
                            block['fields']['RANDOM_VARIABLE'] = random_variable_name
                            code = code.format(**block['fields'])
                        event_handler.append('\t' * self.indent + code)
                    event_handler.append('')
                elif(block['type'] == 'controls_if'):
                    self.generate_if_statement(block, event_handler)
                elif(block['type'] == 'controls_repeat_ext' or block['type'] == 'controls_whileUntil' or block['type'] == 'controls_for'):
                    self.generate_loop(block, event_handler)
                elif(block['type'] == 'variables_set_integer'):
                    code = '{variable} = (int)({value});'.format(variable=self.variables[block['fields']['VAR']['id']]['name'], value=self.generate_sub_section(block['inputs']['VALUE']['block']))
                    event_handler.append(('\t' * self.indent) + code)
                elif(block['type'] == 'variables_set_float'):
                    code = '{variable} = (float)({value});'.format(variable=self.variables[block['fields']['VAR']['id']]['name'], value=self.generate_sub_section(block['inputs']['VALUE']['block']))
                    event_handler.append(('\t' * self.indent) + code)

            if 'next' in block:
                self.next(block['next'], event_handler)

def generate_code(code, only_update=False):  
    data = json.loads(code)
        
    gen = Genarator()

    output = gen.generate_code(data)

    if(only_update):
        return output

    output = ""

    if os.path.exists('skeleton') and os.path.isdir('skeleton'):
        with open('skeleton/src/application.c', 'w') as f:
            f.write(output)
    else:        
        Repo.clone_from('https://github.com/hardwario/twr-skeleton.git', 'skeleton', recursive=True)
        with open('skeleton/src/application.c', 'w') as f:
            f.write(output)

    command = "cmake skeleton -B skeleton/obj/debug -G Ninja -DCMAKE_TOOLCHAIN_FILE=sdk/toolchain/toolchain.cmake -DTYPE=debug && ninja -C skeleton/obj/debug"
    ret = subprocess.run(command, capture_output=True, shell=True)
    print(ret.stdout.decode())