import yaml
import os
import json
import string
import random
import subprocess
from git import Repo
import pyperclip
import xml.etree.ElementTree as ET

class BlockGenarator:
    def __init__(self):
        path = os.path.dirname(os.path.abspath(__file__))
        self.modules_path = os.path.join(path, 'blocks')
        self.categories_path = os.path.join(path, 'categories')

        self.modules = {}

        self.blocks = []

        self.categories = {}

        self.load_modules()
        self.load_categories()

    def load_modules(self):
        for filename in os.listdir(self.modules_path):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                with open(os.path.join(self.modules_path, filename)) as f:
                    data = yaml.load(f, Loader=yaml.FullLoader)
                    for name in data:
                        self.modules[name] = data[name]
    
    def load_categories(self):
        for filename in os.listdir(self.categories_path):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                with open(os.path.join(self.categories_path, filename)) as f:
                    data = yaml.load(f, Loader=yaml.FullLoader)
                    print(data)
                    for name in data['categories']:
                        print(name)
                        self.categories[name] = {'configuration' : data['categories'][name], 'blocks': []}
        print(self.categories)

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
        #block['colour'] = 230
        block['tooltip'] = 'Application Initialization'
        block['helpUrl'] = ''
        self.blocks.append(block)
        self.categories['Initialization']['blocks'].append(block['type'])

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
        #block['colour'] = 230
        block['tooltip'] = 'Application Task'
        block['helpUrl'] = ''
        self.blocks.append(block)
        self.categories['Task']['blocks'].append(block['type'])

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
        if 'colour' in block_yaml:
            block["colour"] = block_yaml['colour']
        block["tooltip"] = ""
        block["helpUrl"] = ""
        self.blocks.append(block)
        self.categories['Initialization']['blocks'].append(block['type'])
    
    def generate_module_event_handler(self, module, module_name):
        block = {}
        category = module['category'][0]
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
        if 'colour' in handler_yaml:
            block["colour"] = handler_yaml['colour']
        block["tooltip"] = ""
        block["helpUrl"] = ""
        self.blocks.append(block)
        self.categories[category]['blocks'].append(block['type'])

    def generate_module_actions(self, module, module_name):
        actions_yaml = module['action']
        category = module['category'][0]

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
            if 'colour' in block_yaml:
                block["colour"] = block_yaml['colour']
            block["tooltip"] = ""
            block["helpUrl"] = ""
            self.blocks.append(block)
            self.categories[category]['blocks'].append(block['type'])

    def indent(self, elem, level=0):
        i = "\n" + level*"  "
        j = "\n" + (level-1)*"  "
        if len(elem):
            if not elem.text or not elem.text.strip():
                elem.text = i + "  "
            if not elem.tail or not elem.tail.strip():
                elem.tail = i
            for subelem in elem:
                self.indent(subelem, level+1)
            if not elem.tail or not elem.tail.strip():
                elem.tail = j
        else:
            if level and (not elem.tail or not elem.tail.strip()):
                elem.tail = j
        return elem

    def generate_categories(self):
        root = ET.Element('categories')

        for category in self.categories:
            if self.categories[category]['configuration'] != None and 'colour' in self.categories[category]['configuration']:
                colour = self.categories[category]['configuration']['colour']  
            else :
                colour = '#000000'
            if(category == 'Integer Variables'):
                category_element = ET.SubElement(root, 'category', {'name': category, 'colour': colour, 'custom': 'INTEGER_PALETTE'})
            elif(category == 'Float Variables'):
                category_element = ET.SubElement(root, 'category', {'name': category, 'colour': colour, 'custom': 'FLOAT_PALETTE'})
            else:
                category_element = ET.SubElement(root, 'category', {'name': category, 'colour': colour})
            
            if(category == 'Logic'):
                block_element = ET.SubElement(category_element, 'block', {'type': 'controls_if'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'logic_compare'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'logic_operation'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'logic_negate'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'logic_boolean'})
            elif(category == 'Math'):
                block_element = ET.SubElement(category_element, 'block', {'type': 'math_number'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'math_arithmetic'})
            elif(category == 'Loops'):
                block_element = ET.SubElement(category_element, 'block', {'type': 'controls_repeat_ext'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'controls_whileUntil'})
                block_element = ET.SubElement(category_element, 'block', {'type': 'controls_for'})
            else:
                for block in self.categories[category]['blocks']:
                    block_element = ET.SubElement(category_element, 'block', {'type': block})

        tree = ET.ElementTree(self.indent(root))
        tree.write('categories.xml', xml_declaration=False, method="html")

        infile = "categories.xml"
        outfile = "categories_cleaned.xml"

        delete_list = ["<categories>", "</categories>"]
        with open(infile) as fin, open(outfile, "w+") as fout:
            for line in fin:
                for word in delete_list:
                    line = line.replace(word, "")
                fout.write(line)      

    def generate_blocks(self):
        self.generate_static_blocks()

        for module_name in self.modules:
            module = self.modules[module_name]
            self.generate_module_initialization(module, module_name)
            if('handler' in module):
                self.generate_module_event_handler(module, module_name)
            if('action' in module):
                self.generate_module_actions(module, module_name)

        self.generate_categories()
        return self.blocks, self.categories

def generate_blocks():
    gen = BlockGenarator()

    blocks, categories = gen.generate_blocks()
    path = os.path.dirname(os.path.abspath(__file__))
    with open("categories_cleaned.xml", "rt") as fin:
        with open(os.path.join(path, 'templates', 'index.html'), "wt") as fout:
            with open(os.path.join(path, 'templates', 'index.html.template'), "rt") as fin_template:
                template = fin_template.read()
                categories = fin.read()
                template = template.replace('<!--CATEGORIES-->', categories)
                fout.write(template)

    with open(os.path.join(path, 'static', 'js', 'blocks-json.js'), "wt") as fout:
        json_blocks = json.dumps(blocks, indent = 4)
        string = 'Blockly.defineBlocksWithJsonArray(' + json_blocks + ');'
        fout.write(string)

if __name__ == '__main__':
    generate_blocks()