import json
import re
import string
import random
from git import Repo
import subprocess
import os
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

    elif(block['type'] == 'initialize_motion_detector'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_module_pir_t pir;\n---GLOBAL VARIABLE---")
        output += 'twr_module_pir_init(&pir);\n\t'
        output += 'twr_module_pir_set_sensitivity(&pir, {sensitivity});\n\n\t'.format(sensitivity=block['fields']['SENSITIVITY'])
        output += '---PIR SET EVENT HANDLER---\n\n\t'
        
    elif(block['type'] == 'initialize_power_module'):
        output += 'twr_module_power_init();\n\t'

    elif(block['type'] == 'initialize_led_strip'):
        if(not 'twr_module_power_init();' in output):
            output += 'twr_module_power_init();\n\t'

        output = output.replace("---GLOBAL VARIABLE---", '''#define LED_STRIP_COUNT {count}
                                
#define LED_STRIP_TYPE 4

#define LED_STRIP_SWAP_RG 0
---GLOBAL VARIABLE---'''.format(count=block['fields']['LEDS']))
        
        output = output.replace("---GLOBAL VARIABLE---", '''static uint32_t _twr_module_power_led_strip_dma_buffer[LED_STRIP_COUNT * LED_STRIP_TYPE * 2];
const twr_led_strip_buffer_t led_strip_buffer =
{
    .type = LED_STRIP_TYPE,
    .count = LED_STRIP_COUNT,
    .buffer = _twr_module_power_led_strip_dma_buffer
};

static struct
{
    enum
    {
        LED_STRIP_SHOW_COLOR = 0,
        LED_STRIP_SHOW_COMPOUND = 1,
        LED_STRIP_SHOW_EFFECT = 2,
        LED_STRIP_SHOW_THERMOMETER = 3

    } show;
    twr_led_strip_t self;
    uint32_t color;
    struct
    {
        uint8_t data[TWR_RADIO_NODE_MAX_COMPOUND_BUFFER_SIZE];
        int length;
    } compound;
    struct
    {
        float temperature;
        int8_t min;
        int8_t max;
        uint8_t white_dots;
        float set_point;
        uint32_t color;

    } thermometer;

    twr_scheduler_task_id_t update_task_id;

} led_strip = { .show = LED_STRIP_SHOW_COLOR, .color = 0 };\n---GLOBAL VARIABLE---''')
        output = output.replace("---GLOBAL VARIABLE---", '''---GLOBAL VARIABLE---\nvoid led_strip_update_task(void *param)
{
    (void) param;

    if (!twr_led_strip_is_ready(&led_strip.self))
    {
        twr_scheduler_plan_current_now();

        return;
    }

    twr_led_strip_write(&led_strip.self);

    twr_scheduler_plan_current_relative(250);
}\n''')

        output += '''twr_led_strip_init(&led_strip.self, twr_module_power_get_led_strip_driver(), &led_strip_buffer);\n\tled_strip.update_task_id = twr_scheduler_register(led_strip_update_task, NULL, 0);\n'''
        
    elif(block['type'] == 'initialize_lcd'):
        output = output.replace("---GLOBAL VARIABLE---", "twr_gfx_t *pgfx;\n---GLOBAL VARIABLE---")
        output += "twr_module_lcd_init();\n\t"
        output += 'pgfx = twr_module_lcd_get_gfx();\n\t'
        output += 'twr_gfx_set_font(pgfx, &twr_font_ubuntu_13);\n\t'
        output += 'twr_gfx_draw_string(pgfx, 50, 50, "LCD WORKING", true);\n\t'    
        output += 'twr_gfx_update(pgfx);\n'
    
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

def construct_application_task(block, output):
    print(block)
    interval = block['fields']['task_interval']
    output = output.replace('---APPLICATION TASK SCHEDULE---', '\ttwr_scheduler_plan_from_now(0, {interval});'.format(interval=interval))

    output = output.replace('---APPLICATION TASK---', 'void application_task()\r\n{\r\n---APPLICATION TASK ACTION---\r\n}')

    output = add_action('---APPLICATION TASK ACTION---', block['inputs']['application_task']['block'], output)

    output = output.replace('---APPLICATION TASK ACTION---', '\ttwr_scheduler_plan_current_relative({interval});'.format(interval=interval))

    return output

def construct_event_handler(event_handler, output):
    if(event_handler['type'] == 'on_button'):
        if '---BUTTON SET EVENT HANDLER---' in output:
            output = output.replace('---BUTTON SET EVENT HANDLER---', 'twr_button_set_event_handler(&button, button_event_handler, NULL);')
            output = output.replace('---EVENT HANDLER---', 'void button_event_handler(twr_button_t *self, twr_button_event_t event, void *event_param)\n{\n\t---BUTTON EVENT---\n}\n---EVENT HANDLER---')

        if('---ELSE BUTTON EVENT---' in output):
            output = output.replace('---ELSE BUTTON EVENT---', '''\telse if (event == TWR_BUTTON_EVENT_{event})\n\t{{\n\t---{event} ACTION---\n\t}}\n\t\t---ELSE BUTTON EVENT---'''.format(event=event_handler['fields']['NAME']))
        else:
            output = output.replace('---BUTTON EVENT---', '''if (event == TWR_BUTTON_EVENT_{event})\n\t{{\n\t---{event} ACTION---\n\t}}\n\t\t---ELSE BUTTON EVENT---'''.format(event=event_handler['fields']['NAME']))
        output = add_action('---{event} ACTION---'.format(event=event_handler['fields']['NAME']), event_handler['inputs']['button_statements']['block'], output)
    if(event_handler['type'] == 'on_movement'):
        if '---PIR SET EVENT HANDLER---' in output:
            output = output.replace('---PIR SET EVENT HANDLER---', 'twr_module_pir_set_event_handler(&pir, pir_event_handler, NULL);')
            output = output.replace('---EVENT HANDLER---', 'void pir_event_handler(twr_module_pir_t *self, twr_module_pir_event_t event, void *event_param)\n{\n\t---PIR EVENT---\n}\n---EVENT HANDLER---')
        
        output = output.replace('---PIR EVENT---', '''if (event == TWR_MODULE_PIR_EVENT_MOTION)\n\t{\n\t---PIR ACTION---\n\t}\n\t\t''')

        output = add_action('---PIR ACTION---', event_handler['inputs']['motion_statements']['block'], output)


    print(json.dumps(event_handler, indent = 4, sort_keys=True))

    return output

def construct_initialization(application_init_json, output):
    output = """#include <application.h>

---GLOBAL VARIABLE---

---EVENT HANDLER---

void application_init(void)
{\n\t"""

    print(application_init_json)
    output = add_initialization_part(application_init_json['inputs']['application_init']['block'], output)

    output = output[:-1]

    output += '---APPLICATION TASK SCHEDULE---\r\n}\r\n\r\n---APPLICATION TASK---'

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
        elif(i['type'] == 'on_movement'):
            output = construct_event_handler(i, output)

    for i in data['blocks']['blocks']:
        if(i['type'] == 'application_task'):
            output = construct_application_task(i, output)

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