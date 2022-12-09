import yaml
import os
import json

class Genarator:
    def __init__(self):
        path = os.path.dirname(os.path.abspath(__file__))
        self.blocks_path = os.path.join(path, 'blocks')

        self.blocks = {}

        self.load_blocks()

    def load_blocks(self):
        for filename in os.listdir(self.blocks_path):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                print(filename)
                with open(os.path.join(self.blocks_path, filename)) as f:
                    data = yaml.load(f, Loader=yaml.FullLoader)
                    for name in data:
                        self.blocks[name] = data[name]
        print(json.dumps(self.blocks, indent=2))

    def generate_code(self, data):
        # print(json.dumps(data, indent=2))

        self.global_variable = []
        self.application_init = []
        self.event_handlers = {}

        for block in data['blocks']['blocks']:
            print(block['type'])
            if block['type'] == 'hio_application_initialize':
                self.next(block['inputs']['BLOCKS'])
            if block['type'] == 'hio_button_event':
                print('BUTTON EVENT')
                self.next(block['inputs']['BLOCKS'], self.event_handlers['button_event_{event}'.format(event=block['fields']['NAME'])])
            print('#')

        print('global_variable', self.global_variable)
        print('application_init', self.application_init)

    def next(self, next, event_handler=None):
        print('next', next)
        if 'block' in next:
            block = next['block']
            if '_initialize' in block['type']:
                name = block['type'][len('hio_'):(len(block['type']) - len('_initialize'))]
                print('initialize', name)
                block_definition = self.blocks[name]
                if block_definition:
                    self.global_variable.extend(block_definition.get('global_variable',[]))
                    self.application_init.extend(block_definition.get('application_init',[]))

            if 'next' in block:
                self.next(block['next'])

def main():
    gen = Genarator()


    with open('data.json') as f:
        data = json.load(f)
    
    gen.generate_code(data)


if __name__ == '__main__':
    main()