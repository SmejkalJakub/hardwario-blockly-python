import json
import re
import string
import random
from git import Repo
from telnetlib import OUTMRK
import subprocess
import os
import time
import shutil

random_core_temperature_suffix = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(5)])

def add_initialization_part(block, output):
    if(block['type'] == 'initialize_button'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_button_t button;\n---GLOBAL VARIABLE---")
        output += 'twr_button_init(&button, {gpio}, {pull}, 0);\n\t'.format(gpio=block['fields']['GPIO'], pull=block['fields']['PULL'])
        output += '---BUTTON SET EVENT HANDLER---\n\n\t'

    elif(block['type'] == 'initialize_radio'):
        output += 'twr_radio_init({mode});\n\t'.format(mode=block['fields']['RADIO_MODE'])
        output += 'twr_radio_pairing_request("{name}", "1.0.0");\n\n\t'.format(name=block['fields']['FIRMWARE_NAME'])
    
    elif(block['type'] == 'initialize_led'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_led_t led;\n---GLOBAL VARIABLE---")
        output += 'twr_led_init(&led, TWR_GPIO_LED, false, 0);\n\t'
        output += 'twr_led_pulse(&led, 2000);\n\n\t'
    
    elif(block['type'] == 'initialize_logging'):
        output += 'twr_log_init(TWR_LOG_LEVEL_DUMP, TWR_LOG_TIMESTAMP_ABS);\n\t'
        output += 'twr_log_info("APPLICATION START");\n\n\t'

    elif(block['type'] == 'initialize_core_module_tmp112'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_tmp112_t core_tmp112;\n---GLOBAL VARIABLE---")
        output = output.replace("---GLOBAL VARIABLE---", "float core_module_temperature_{random_suffix} = 9999;\n---GLOBAL VARIABLE---".format(random_suffix=random_core_temperature_suffix))
        output += 'twr_tmp112_init(&core_tmp112, TWR_I2C_I2C0, 0x49);\n\t'
        output += 'twr_tmp112_set_event_handler(&core_tmp112, core_tmp112_event_handler, NULL);\n\t'
        output += 'twr_tmp112_set_update_interval(&core_tmp112, {update_interval});\n\n\t'.format(update_interval=block['fields']['UPDATE_INTERVAL'])

        output = output.replace('---EVENT HANDLER---', 'void core_tmp112_event_handler(twr_tmp112_t *self, twr_tmp112_event_t event, void *event_param)\n{{\n\tif (event == TWR_TMP112_EVENT_UPDATE) {{\n\ttwr_tmp112_get_temperature_celsius(self, &core_module_temperature_{random_suffix});\n\t}}\n}}\n\n---EVENT HANDLER---'.format(random_suffix=random_core_temperature_suffix))

    if 'next' in block.keys():
        output = add_initialization_part(block['next']['block'], output)

    return output

def add_action(action, json, output):
    if(json['type'] == 'send_over_radio_string'):
        output = output.replace(action, '\t\ttwr_radio_pub_string("{subtopic}", "{value}");\n{action}'.format(subtopic=json['fields']['SUBTOPIC'], value=json['fields']['STRING_TO_BE_SEND'], action=action))
    elif(json['type'] == 'send_over_radio_int'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tint {random_name} = {value};\n\t\ttwr_radio_pub_int("{subtopic}", &{random_name});\n{action}'.format(random_name=random_variable_name, subtopic=json['fields']['SUBTOPIC'], value=json['fields']['INT_TO_BE_SEND'], action=action))
    elif(json['type'] == 'send_over_radio_float'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tfloat {random_name} = {value};\n\t\ttwr_radio_pub_float("{subtopic}", &{random_name});\n{action}'.format(random_name=random_variable_name, subtopic=json['fields']['SUBTOPIC'], value=json['fields']['FLOAT_TO_BE_SEND'], action=action))
    elif(json['type'] == 'send_over_radio_boolean'):
        random_variable_name = ''.join([random.choice(string.ascii_letters + string.digits  ) for n in range(12)])
        output = output.replace(action, '\t\tbool {random_name} = {value};\n\t\ttwr_radio_pub_bool("{subtopic}", &{random_name});\n{action}'.format(random_name=random_variable_name, subtopic=json['fields']['SUBTOPIC'], value=json['fields']['BOOL_TO_BE_SEND'], action=action))
    elif(json['type'] == 'led_blink'):
        output = output.replace(action, '\t\ttwr_led_blink(&led, {count});\n{action}'.format(count=json['fields']['COUNT'], action=action))
    elif(json['type'] == 'led_pulse'):
        output = output.replace(action, '\t\ttwr_led_pulse(&led, {duration});\n{action}'.format(duration=json['fields']['DURATION'], action=action))
    elif(json['type'] == 'led_mode'):
        output = output.replace(action, '\t\ttwr_led_set_mode(&led, {mode});\n{action}'.format(mode=json['fields']['MODE'], action=action))
    elif(json['type'] == 'publish_button_event_count'):
        action_lower = ((action.lower()).split('---')[1]).split(' ')[0]
        if(action_lower == 'click' or action_lower == 'hold'):
            action_event_variable = action_lower + '_button_event_count'
            if(action_lower == 'click'):
                event_name = 'PUSH'
            else:
                event_name = 'HOLD'
            if(action_event_variable in output):
                output = output.replace(action, '\t\ttwr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_{event_name}_BUTTON, &{global_variable});\n{action}'.format(event_name=event_name, global_variable=action_event_variable, action=action))
            else:
                output = output.replace("---GLOBAL VARIABLE---", "uint16_t {global_variable} = 0;\n---GLOBAL VARIABLE---".format(global_variable=action_event_variable))
                output = output.replace(action, '\t\t{global_variable}++;\n{action}'.format(global_variable=action_event_variable,  action=action))
                output = output.replace(action, '\t\ttwr_radio_pub_event_count(TWR_RADIO_PUB_EVENT_{event_name}_BUTTON, &{global_variable});\n{action}'.format(event_name=event_name, global_variable=action_event_variable, action=action))

    elif('log_' in json['type']):
        if 'inputs' in json.keys():
            if(json['inputs']['VARIABLE']['block']['type'] == 'core_temperature'):
                output = output.replace(action, '\t\ttwr_{log_type}("{message} %.2f", core_module_temperature_{random_suffix});\n{action}'.format(log_type=json['type'], message=json['fields']['MESSAGE'], action=action, random_suffix=random_core_temperature_suffix))
        else:
            output = output.replace(action, '\t\ttwr_{log_type}("{message}");\n{action}'.format(log_type=json['type'], message=json['fields']['MESSAGE'], action=action))

    if 'next' in json.keys():
        output = add_action(action, json['next']['block'], output)

    return output

def construct_event_handler(event_handler, output):
    if(event_handler['type'] == 'on_button'):
        if '---BUTTON SET EVENT HANDLER---' in output:
            output = output.replace('---BUTTON SET EVENT HANDLER---', 'twr_button_set_event_handler(&button, button_event_handler, NULL);')
            output = output.replace('---EVENT HANDLER---', 'void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)\n{\n\t---BUTTON EVENT---\n}\n---EVENT HANDLER---')

        if('---ELSE BUTTON EVENT---' in output):
            output = output.replace('---ELSE BUTTON EVENT---', '''\telse if (event == TWR_BUTTON_EVENT_{event})
    \t{{
    ---{event} ACTION---
    \t}}
        ---ELSE BUTTON EVENT---'''.format(event=event_handler['fields']['NAME']))
        else:
            output = output.replace('---BUTTON EVENT---', '''if (event == TWR_BUTTON_EVENT_{event})
    \t{{
    ---{event} ACTION---
    \t}}
        ---ELSE BUTTON EVENT---'''.format(event=event_handler['fields']['NAME']))

    output = add_action('---{event} ACTION---'.format(event=event_handler['fields']['NAME']), event_handler['inputs']['button_statements']['block'], output)

    print(json.dumps(event_handler, indent = 4, sort_keys=True))

    return output

def construct_initialization(application_init_json, output):
    output = """#include <application.h>

---GLOBAL VARIABLE---

---EVENT HANDLER---

void application_init(void)
{\n\t"""

    output = add_initialization_part(application_init_json['inputs']['application_init']['block'], output)

    output = output[:-1]

    output += '}'

    return output

def generate_code(code):  
    data = json.loads(code)

    print(json.dumps(data, indent = 4, sort_keys=True))

    output = ""

    for i in data['blocks']['blocks']:
        if(i['type'] == 'application_init'):
            output = construct_initialization(i, output)

    for i in data['blocks']['blocks']:
        if(i['type'] == 'on_button'):
            output = construct_event_handler(i, output)

    output = re.sub('---.*---', '', output)

    print(output)

    if os.path.exists('skeleton') and os.path.isdir('skeleton'):
        shutil.rmtree('skeleton')

    Repo.clone_from('https://github.com/hardwario/twr-skeleton.git', 'skeleton', recursive=True)

    with open('skeleton/src/application.c', 'w') as f:
        f.write(output)

    command = "cmake skeleton -B skeleton/obj/debug -G Ninja -DCMAKE_TOOLCHAIN_FILE=sdk/toolchain/toolchain.cmake -DTYPE=debug && ninja -C skeleton/obj/debug"
    ret = subprocess.run(command, capture_output=True, shell=True)
    print(ret.stdout.decode())
            