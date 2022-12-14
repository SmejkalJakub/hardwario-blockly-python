import yaml
import os
import json
import string
import random
import subprocess
from git import Repo
import pyperclip


class BlockGenarator:
    def __init__(self):
        path = os.path.dirname(os.path.abspath(__file__))
        self.modules_path = os.path.join(path, 'blocks')

        self.modules = {}

        self.blocks = []

        self.load_modules()

    def load_modules(self):
        for filename in os.listdir(self.modules_path):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                with open(os.path.join(self.modules_path, filename)) as f:
                    data = yaml.load(f, Loader=yaml.FullLoader)
                    for name in data:
                        self.modules[name] = data[name]

    def generate_static_blocks(self):
        block = {}

        block['type'] = 'hio_application_initialize'
        block['message0'] = 'Application Initialization %1 %2'
        block['args0'] = [
            {
                'type': 'input_dummy'
            },
            {
                'type': 'input_statement',
                'name': 'BLOCKS'
            }
        ]
        block['colour'] = 230
        block['tooltip'] = 'Application Initialization'
        block['helpUrl'] = ''
        self.blocks.append(block)

        block = {}
        block['type'] = 'hio_application_task'
        block['message0'] = 'Application Task %1 Repeat every %2 ms %3 %4'
        block['args0'] = [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "TASK_INTERVAL",
                "value": 1000,
                "min": 100
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ]
        block['colour'] = 230
        block['tooltip'] = 'Application Task'
        block['helpUrl'] = ''
        self.blocks.append(block)

        block = {
            "type": "variables_get_integer",
            "message0": "%1",
            "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": ["Integer"],   
                "defaultType": "Integer"
            }
            ],
            "output": "Number",    
        }
        self.blocks.append(block)

        block = {
            "type": "variables_set_integer",
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
            {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": ["Integer"],
                "defaultType": "Integer"
            },
            {
                "type": "input_value",
                "name": "VALUE",
            }
            ],
            "previousStatement": 'null',
            "nextStatement": 'null',
        }
        self.blocks.append(block)

        block = {
            "type": "variables_get_float",
            "message0": "%1",
            "args0": [
              {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": ["Float"],   
                "defaultType": "Float"
              }
            ],
            "output": "Number",    
        }
        self.blocks.append(block)
        block = {
            "type": "variables_set_float",
            "message0": "%{BKY_VARIABLES_SET}",
            "args0": [
              {
                "type": "field_variable",
                "name": "VAR",
                "variable": "%{BKY_VARIABLES_DEFAULT_NAME}",
                "variableTypes": ["Float"],
                "defaultType": "Float"
              },
              {
                "type": "input_value",
                "name": "VALUE",
              }
            ],
            "previousStatement": "null",
            "nextStatement": "null",
        }
        self.blocks.append(block)

    def generate_module_initialization(self, module, module_name):
        block = {}
        block_yaml = module['application_init']['block']
        block['type'] = 'hio_' + module_name + '_initialize'
        block['message0'] = ''
        for text in block_yaml['text']:
            if(text == block_yaml['text'][-1]):
                block['message0'] += text
            else:
                block['message0'] += text + ' '
        if('arguments' in block_yaml):
            block['args0'] = []
            for argument in block_yaml['arguments']:
                argument_yaml = block_yaml['arguments'][argument]
                if(argument_yaml['type'] == 'new_line'):
                    block['args0'].append({
                        'type': 'input_dummy'
                    })
                elif(argument_yaml['type'] == 'number'):
                    block['args0'].append({
                        'type': 'field_number',
                        'name': argument,
                        'value': argument_yaml['value'],
                        'min': argument_yaml['min'],
                        'max': argument_yaml['max']
                    })
                elif(argument_yaml['type'] == 'dropdown'):
                    block['args0'].append({
                        'type': 'field_dropdown',
                        'name': argument,
                        'options': argument_yaml['options']
                    })
                elif(argument_yaml['type'] == 'text'):
                    block['args0'].append({
                        'type': 'field_input',
                        'name': argument,
                        'text': argument_yaml['value']
                    })
                elif(argument_yaml['type'] == 'input'):
                     block['args0'].append({
                        'type': 'input_value',
                        'name': argument,
                    })

        block["previousStatement"] = 'null'
        block["nextStatement"] = 'null'
        block["colour"] = '345'
        block["tooltip"] = ""
        block["helpUrl"] = ""
        self.blocks.append(block)
    
    def generate_module_event_handler(self, module, module_name):
        block = {}
        handler_yaml = module['handler']

        block['type'] = 'hio_' + module_name + '_event'
        block['message0'] = handler_yaml['block']['text'] + ' %2 %3'

        events = []

        for event in handler_yaml['events']['enum']:
            events.append([event, event])

        block['args0'] = [
            {
                'type': 'field_dropdown',
                'name': 'NAME',
                'options': events                
            },
            {
                'type': 'input_dummy'
            },
            {
                'type': 'input_statement',
                'name': 'BLOCKS'
            }
        ]
        block["colour"] = '345'
        block["tooltip"] = ""
        block["helpUrl"] = ""
        self.blocks.append(block)

    def generate_module_actions(self, module, module_name):
        actions_yaml = module['action']

        print(module_name)
        for action in actions_yaml:
            block = {}
            block_yaml = actions_yaml[action]['block']

            block['type'] = 'hio_' + module_name + '_' + action
            block['message0'] = ''
            for text in block_yaml['text']:
                if(text == block_yaml['text'][-1]):
                    block['message0'] += text
                else:
                    block['message0'] += text + ' '
            if('arguments' in block_yaml):
                block['args0'] = []
                for argument in block_yaml['arguments']:
                    argument_yaml = block_yaml['arguments'][argument]
                    if(argument_yaml['type'] == 'new_line'):
                        block['args0'].append({
                            'type': 'input_dummy'
                        })
                    elif(argument_yaml['type'] == 'number'):
                        block['args0'].append({
                            'type': 'field_number',
                            'name': argument,
                            'value': argument_yaml['value'],
                            'min': argument_yaml['min'],
                            'max': argument_yaml['max']
                        })
                    elif(argument_yaml['type'] == 'dropdown'):
                        block['args0'].append({
                            'type': 'field_dropdown',
                            'name': argument,
                            'options': argument_yaml['options']
                        })
                    elif(argument_yaml['type'] == 'text'):
                        block['args0'].append({
                            'type': 'field_input',
                            'name': argument,
                            'text': argument_yaml['value']
                        })
                    elif(argument_yaml['type'] == 'input'):
                        block['args0'].append({
                            'type': 'input_value',
                            'name': argument,
                        })
            block["previousStatement"] = 'null'
            block["nextStatement"] = 'null'
            block["colour"] = '345'
            block["tooltip"] = ""
            block["helpUrl"] = ""
            self.blocks.append(block)


    def generate_blocks(self):
        self.generate_static_blocks()

        for module_name in self.modules:
            module = self.modules[module_name]
            self.generate_module_initialization(module, module_name)
            if('handler' in module):
                self.generate_module_event_handler(module, module_name)
            if('action' in module):
                self.generate_module_actions(module, module_name)
            blocks_to_print = json.dumps(self.blocks, indent=2)
            #print(blocks_to_print)

        return self.blocks

def generate_blocks():  
    gen = BlockGenarator()

    output = gen.generate_blocks()
    # Pretty print json
    output = json.dumps(output, indent=2)
    pyperclip.copy(output)


    #print(output)

if __name__ == '__main__':
    generate_blocks()