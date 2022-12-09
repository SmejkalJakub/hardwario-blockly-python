Blockly.defineBlocksWithJsonArray([{
   "type": "hio_application_initialize",
   "message0": "Application Initialization %1 %2",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "input_statement",
       "name": "BLOCKS"
     }
   ],
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_button_initialize",
   "message0": "Initialize Button %1 Button GPIO %2 %3 Button pull %4 %5 Default State %6",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "GPIO",
       "options": [
         [
           "TWR_GPIO_BUTTON",
           "TWR_GPIO_BUTTON"
         ]
       ]
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "PULL",
       "options": [
         [
           "TWR_GPIO_PULL_DOWN",
           "TWR_GPIO_PULL_DOWN"
         ],
         [
           "TWR_GPIO_PULL_NONE",
           "TWR_GPIO_PULL_NONE"
         ],
         [
           "TWR_GPIO_PULL_UP",
           "TWR_GPIO_PULL_UP"
         ]
       ]
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "STATE",
       "options": [
         [
           "TRUE",
           "TRUE"
         ],
         [
           "FALSE",
           "FALSE"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_button_event",
   "message0": "On Button %1 %2 %3",
   "args0": [
     {
       "type": "field_dropdown",
       "name": "NAME",
       "options": [
         [
           "PRESS",
           "PRESS"
         ],
         [
           "RELEASE",
           "RELEASE"
         ],
         [
           "CLICK",
           "CLICK"
         ],
         [
           "HOLD",
           "HOLD"
         ]
       ]
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "input_statement",
       "name": "BLOCKS"
     }
   ],
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_radio_initialize",
   "message0": "Initialize Radio %1 Radio Mode %2 %3 Firmware Name %4",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "RADIO_MODE",
       "options": [
         [
           "TWR_RADIO_MODE_NODE_SLEEPING",
           "TWR_RADIO_MODE_NODE_SLEEPING"
         ],
         [
           "TWR_RADIO_MODE_NODE_LISTENING",
           "TWR_RADIO_MODE_NODE_LISTENING"
         ]
       ]
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "FIRMWARE_NAME",
       "text": "twr-blockly-firmware"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_radio_send_string",
   "message0": "Send %1 over the radio %2 with subtopic %3",
   "args0": [
     {
       "type": "field_input",
       "name": "STRING_TO_BE_SEND",
       "text": "STRING"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "SUBTOPIC",
       "text": "string"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_radio_send_integer",
   "message0": "Send %1 over the radio %2 with subtopic %3",
   "args0": [
     {
       "type": "field_input",
       "name": "INT_TO_BE_SEND",
       "text": "1"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "SUBTOPIC",
       "text": "int"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_radio_send_float",
   "message0": "Send %1 over the radio %2 with subtopic %3",
   "args0": [
     {
       "type": "field_input",
       "name": "FLOAT_TO_BE_SEND",
       "text": "1.0"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "SUBTOPIC",
       "text": "float"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_radio_send_boolean",
   "message0": "Send %1 over the radio %2 with subtopic %3",
   "args0": [
     {
       "type": "field_dropdown",
       "name": "BOOL_TO_BE_SEND",
       "options": [
         [
           "true",
           "true"
         ],
         [
           "false",
           "false"
         ]
       ]
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "SUBTOPIC",
       "text": "bool"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_led_blink",
   "message0": "LED Blink %1 times",
   "args0": [
     {
       "type": "field_input",
       "name": "COUNT",
       "text": "1"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_led_pulse",
   "message0": "LED Pulse for %1 milliseconds",
   "args0": [
     {
       "type": "field_input",
       "name": "DURATION",
       "text": "1000"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_led_set_mode",
   "message0": "Set LED mode to %1",
   "args0": [
     {
       "type": "field_dropdown",
       "name": "MODE",
       "options": [
         [
           "TWR_LED_MODE_BLINK",
           "TWR_LED_MODE_BLINK"
         ],
         [
           "TWR_LED_MODE_BLINK_FAST",
           "TWR_LED_MODE_BLINK_FAST"
         ],
         [
           "TWR_LED_MODE_BLINK_SLOW",
           "TWR_LED_MODE_BLINK_SLOW"
         ],
         [
           "TWR_LED_MODE_FLASH",
           "TWR_LED_MODE_FLASH"
         ],
         [
           "TWR_LED_MODE_OFF",
           "TWR_LED_MODE_OFF"
         ],
         [
           "TWR_LED_MODE_ON",
           "TWR_LED_MODE_ON"
         ],
         [
           "TWR_LED_MODE_TOGGLE",
           "TWR_LED_MODE_TOGGLE"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_button_publish_event_count",
   "message0": "Publish button event over the radio",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_led_initialize",
   "message0": "Initialize LED",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_logging_initialize",
   "message0": "Initialize Logging",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_logging_info",
   "message0": "Log Info %1 Message: %2 %3 Variable %4",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "MESSAGE",
       "text": "Info"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "input_value",
       "name": "VARIABLE"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 135,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_logging_warning",
   "message0": "Log Warning %1 Message: %2 %3 Variable %4",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "MESSAGE",
       "text": "Warning"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "input_value",
       "name": "VARIABLE"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 45,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_logging_debug",
   "message0": "Log Debug %1 Message: %2 %3 Variable %4",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "MESSAGE",
       "text": "Debug"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "input_value",
       "name": "VARIABLE"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 300,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_logging_error",
   "message0": "Log Error %1 Message: %2 %3 Variable %4",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_input",
       "name": "MESSAGE",
       "text": "Error"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "input_value",
       "name": "VARIABLE"
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_core_tmp112_initialize",
   "message0": "Initialize Core Module Temperature Sensor %1 With Update interval %2 ms",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "UPDATE_INTERVAL",
       "value": 5000,
       "min": 100,
       "max": 40000
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 345,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_core_tmp112_value",
   "message0": "Core Temperature",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_integer_value",
   "message0": "Integer %1",
   "args0": [
     {
       "type": "field_number",
       "name": "VALUE",
       "value": 0
     }
   ],
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_string_value",
   "message0": "String %1",
   "args0": [
     {
       "type": "field_input",
       "name": "VALUE",
       "text": "text"
     }
   ],
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_button_clicks_value",
   "message0": "Button Clicks",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_button_holds_value",
   "message0": "Button Holds",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_application_task",
   "message0": "Application Task %1 Repeat every %2 ms %3 %4",
   "args0": [
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
   ],
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_pir_initialize",
   "message0": "Initialize Motion Detector %1 With Sensitivity %2",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "SENSITIVITY",
       "options": [
         [
           "TWR_MODULE_PIR_SENSITIVITY_LOW",
           "TWR_MODULE_PIR_SENSITIVITY_LOW"
         ],
         [
           "TWR_MODULE_PIR_SENSITIVITY_MEDIUM",
           "TWR_MODULE_PIR_SENSITIVITY_MEDIUM"
         ],
         [
           "TWR_MODULE_PIR_SENSITIVITY_HIGH",
           "TWR_MODULE_PIR_SENSITIVITY_HIGH"
         ],
         [
           "TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH",
           "TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_pir_event",
   "message0": "On Movement Detected %1 %2",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "input_statement",
       "name": "BLOCKS"
     }
   ],
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_power_initialize",
   "message0": "Initialize Power Module",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_led_strip_initialize",
   "message0": "Initialize LED Strip %1 Number of LEDs:  %2",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "LEDS",
       "options": [
         [
           "36",
           "36"
         ],
         [
           "72",
           "72"
         ],
         [
           "144",
           "144"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_power_relay_state_value",
   "message0": "Power Module Relay State",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_power_relay_state_set",
   "message0": "Power Module Relay Set State %1 State:  %2",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_dropdown",
       "name": "STATE",
       "options": [
         [
           "ON",
           "ON"
         ],
         [
           "OFF",
           "OFF"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_initialize",
   "message0": "Initialize LCD Module",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_draw_string",
   "message0": "Draw stirng  %1 on LCD %2 %3 pixels from left %4 %5 pixels from top",
   "args0": [
     {
       "type": "field_input",
       "name": "STRING",
       "text": "String"
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "LEFT",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "TOP",
       "value": 0,
       "min": 0,
       "max": 128
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_draw_circle",
   "message0": "Draw circle on LCD %1 Center: x: %2 y: %3 and %4 Radius:  %5",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "CENTER_X",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "field_number",
       "name": "CENTER_Y",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "RADIUS",
       "value": 0,
       "min": 0,
       "max": 128
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_draw_line",
   "message0": "Draw line on LCD %1 Start: x: %2 y: %3 and %4 End: x %5 y: %6",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "START_X",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "field_number",
       "name": "START_Y",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "END_X",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "field_number",
       "name": "END_Y",
       "value": 0,
       "min": 0,
       "max": 128
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_draw_rectangle",
   "message0": "Draw rectangle on LCD %1 Start: x: %2 y: %3 and %4 End: x %5 y: %6",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "START_X",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "field_number",
       "name": "START_Y",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "END_X",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "field_number",
       "name": "END_Y",
       "value": 0,
       "min": 0,
       "max": 128
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_draw_pixel",
   "message0": "Draw pixel on LCD %1 %2 pixels from left %3 %4 pixels from top",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "LEFT",
       "value": 0,
       "min": 0,
       "max": 128
     },
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "TOP",
       "value": 0,
       "min": 0,
       "max": 128
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_set_font",
   "message0": "Set LCD font size to %1",
   "args0": [
     {
       "type": "field_dropdown",
       "name": "FONT",
       "options": [
         [
           "11",
           "twr_font_ubuntu_11"
         ],
         [
           "13",
           "twr_font_ubuntu_13"
         ],
         [
           "15",
           "twr_font_ubuntu_15"
         ],
         [
           "24",
           "twr_font_ubuntu_24"
         ],
         [
           "28",
           "twr_font_ubuntu_28"
         ],
         [
           "33",
           "twr_font_ubuntu_33"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_set_power_state",
   "message0": "Turn LCD  %1",
   "args0": [
     {
       "type": "field_dropdown",
       "name": "STATE",
       "options": [
         [
           "ON",
           "ON"
         ],
         [
           "OFF",
           "OFF"
         ]
       ]
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_clear",
   "message0": "Clear LCD",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_lcd_update",
   "message0": "Update LDC",
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_climate_initialize",
   "message0": "Initialize Climate Module %1 With Update interval %2 ms",
   "args0": [
     {
       "type": "input_dummy"
     },
     {
       "type": "field_number",
       "name": "UPDATE_INTERVAL",
       "value": 5000,
       "min": 100,
       "max": 40000
     }
   ],
   "previousStatement": null,
   "nextStatement": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_climate_temperature_value",
   "message0": "Climate Temperature",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_climate_humidity_value",
   "message0": "Climate Humidity",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_climate_illuminance_value",
   "message0": "Climate Illuminance ",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
   "type": "hio_climate_pressure_value",
   "message0": "Climate Atmospheric Pressure",
   "output": null,
   "colour": 230,
   "tooltip": "",
   "helpUrl": ""
 },
 {
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
},
{
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
      "check": "Integer" 
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
},
{
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
},
{
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
      "check": "Float"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
},
{
  "type": "hio_lcd_printf",
  "message0": "Print text on LCD %1 %2 pixels from left %3 %4 pixels from top %5 With variable: %6",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "LEFT",
      "value": 0,
      "min": 0,
      "max": 128
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_number",
      "name": "TOP",
      "value": 0,
      "min": 0,
      "max": 128
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "VALUE",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);