/*Blockly.Blocks['application_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Application Initialization");
    this.appendStatementInput("application_init")
        .setCheck(null);
    this.setColour("#E30427");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Button");
    this.appendDummyInput()
        .appendField("Button GPIO")
        .appendField(new Blockly.FieldDropdown([["TWR_GPIO_BUTTON","TWR_GPIO_BUTTON"]]), "GPIO");
    this.appendDummyInput()
        .appendField("Button pull")
        .appendField(new Blockly.FieldDropdown([["TWR_GPIO_PULL_DOWN","TWR_GPIO_PULL_DOWN"], ["TWR_GPIO_PULL_NONE","TWR_GPIO_PULL_NONE"], ["TWR_GPIO_PULL_UP","TWR_GPIO_PULL_UP"]]), "PULL");
    this.appendDummyInput()
        .appendField("Default State")
        .appendField(new Blockly.FieldDropdown([["TRUE","TRUE"], ["FALSE","FALSE"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#009900");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['on_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On Button")
        .appendField(new Blockly.FieldDropdown([["PRESS","PRESS"], ["RELEASE","RELEASE"], ["CLICK","CLICK"], ["HOLD","HOLD"]]), "NAME");
    this.appendStatementInput("button_statements")
        .setCheck(null);
    this.setColour("#006600");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_radio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Radio");
    this.appendDummyInput()
        .appendField("Radio Mode")
        .appendField(new Blockly.FieldDropdown([["TWR_RADIO_MODE_NODE_SLEEPING","TWR_RADIO_MODE_NODE_SLEEPING"], ["TWR_RADIO_MODE_NODE_LISTENING","TWR_RADIO_MODE_NODE_LISTENING"]]), "RADIO_MODE");
    this.appendDummyInput()
        .appendField("Firmware Name")
        .appendField(new Blockly.FieldTextInput("twr-blockly-firmware"), "FIRMWARE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CC6600");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldTextInput("STRING"), "STRING_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("string"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CC6600");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_int'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldTextInput("1"), "INT_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("int"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CC6600");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_float'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldTextInput("1.0"), "FLOAT_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("float"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CC6600");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "BOOL_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("bool"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#CC6600");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_blink'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED Blink")
        .appendField(new Blockly.FieldTextInput("1"), "COUNT")
        .appendField("times");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF3333");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_pulse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED Pulse for")
        .appendField(new Blockly.FieldTextInput("1000"), "DURATION")
        .appendField("milliseconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF3333");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_mode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set LED mode to")
        .appendField(new Blockly.FieldDropdown([["TWR_LED_MODE_BLINK","TWR_LED_MODE_BLINK"], ["TWR_LED_MODE_BLINK_FAST","TWR_LED_MODE_BLINK_FAST"], ["TWR_LED_MODE_BLINK_SLOW","TWR_LED_MODE_BLINK_SLOW"], ["TWR_LED_MODE_FLASH","TWR_LED_MODE_FLASH"], ["TWR_LED_MODE_OFF","TWR_LED_MODE_OFF"], ["TWR_LED_MODE_ON","TWR_LED_MODE_ON"], ["TWR_LED_MODE_TOGGLE","TWR_LED_MODE_TOGGLE"]]), "MODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF3333");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['publish_button_event_count'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Publish button event over the radio");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#009900");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize LED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#FF3333");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_logging'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Logging");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#6600CC");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_info'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Info");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Info"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_warning'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Warning");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Warning"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_debug'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Debug");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Debug"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_error'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Error");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Error"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_core_module_tmp112'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Core Module Temperature Sensor");
    this.appendDummyInput()
        .appendField("With Update interval")
        .appendField(new Blockly.FieldTextInput("5000"), "UPDATE_INTERVAL")
        .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#0066CC");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['core_temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Core Temperature");
    this.setOutput(true, null);
    this.setColour("#0066CC");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['integer_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Integer")
        .appendField(new Blockly.FieldNumber(0), "VALUE");
    this.setOutput(true, null);
    this.setColour("#E30427");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['string_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("String")
        .appendField(new Blockly.FieldTextInput("text"), "VALUE");
    this.setOutput(true, null);
    this.setColour("#E30427");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['button_clicks'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Button Clicks");
    this.setOutput(true, null);
    this.setColour("#009900");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['button_holds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Button Holds");
    this.setOutput(true, null);
    this.setColour("#009900");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['application_task'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Application Task");
    this.appendDummyInput()
        .appendField("Repeat every")
        .appendField(new Blockly.FieldNumber(1000, 100), "task_interval")
        .appendField("ms");
    this.appendStatementInput("application_task")
        .setCheck(null);
    this.setColour("#E30427");
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
*/


Blockly.Blocks['application_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Application Initialization");
    this.appendStatementInput("application_init")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Button");
    this.appendDummyInput()
        .appendField("Button GPIO")
        .appendField(new Blockly.FieldDropdown([["TWR_GPIO_BUTTON","TWR_GPIO_BUTTON"]]), "GPIO");
    this.appendDummyInput()
        .appendField("Button pull")
        .appendField(new Blockly.FieldDropdown([["TWR_GPIO_PULL_DOWN","TWR_GPIO_PULL_DOWN"], ["TWR_GPIO_PULL_NONE","TWR_GPIO_PULL_NONE"], ["TWR_GPIO_PULL_UP","TWR_GPIO_PULL_UP"]]), "PULL");
    this.appendDummyInput()
        .appendField("Default State")
        .appendField(new Blockly.FieldDropdown([["TRUE","TRUE"], ["FALSE","FALSE"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['on_button'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On Button")
        .appendField(new Blockly.FieldDropdown([["PRESS","PRESS"], ["RELEASE","RELEASE"], ["CLICK","CLICK"], ["HOLD","HOLD"]]), "NAME");
    this.appendStatementInput("button_statements")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_radio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Radio");
    this.appendDummyInput()
        .appendField("Radio Mode")
        .appendField(new Blockly.FieldDropdown([["TWR_RADIO_MODE_NODE_SLEEPING","TWR_RADIO_MODE_NODE_SLEEPING"], ["TWR_RADIO_MODE_NODE_LISTENING","TWR_RADIO_MODE_NODE_LISTENING"]]), "RADIO_MODE");
    this.appendDummyInput()
        .appendField("Firmware Name")
        .appendField(new Blockly.FieldTextInput("twr-blockly-firmware"), "FIRMWARE_NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_string'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldTextInput("STRING"), "STRING_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("string"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_int'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldTextInput("1"), "INT_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("int"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_float'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldTextInput("1.0"), "FLOAT_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("float"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['send_over_radio_boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Send")
        .appendField(new Blockly.FieldDropdown([["true","true"], ["false","false"]]), "BOOL_TO_BE_SEND")
        .appendField("over the radio");
    this.appendDummyInput()
        .appendField("with subtopic")
        .appendField(new Blockly.FieldTextInput("bool"), "SUBTOPIC");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_blink'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED Blink")
        .appendField(new Blockly.FieldTextInput("1"), "COUNT")
        .appendField("times");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_pulse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED Pulse for")
        .appendField(new Blockly.FieldTextInput("1000"), "DURATION")
        .appendField("milliseconds");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_mode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set LED mode to")
        .appendField(new Blockly.FieldDropdown([["TWR_LED_MODE_BLINK","TWR_LED_MODE_BLINK"], ["TWR_LED_MODE_BLINK_FAST","TWR_LED_MODE_BLINK_FAST"], ["TWR_LED_MODE_BLINK_SLOW","TWR_LED_MODE_BLINK_SLOW"], ["TWR_LED_MODE_FLASH","TWR_LED_MODE_FLASH"], ["TWR_LED_MODE_OFF","TWR_LED_MODE_OFF"], ["TWR_LED_MODE_ON","TWR_LED_MODE_ON"], ["TWR_LED_MODE_TOGGLE","TWR_LED_MODE_TOGGLE"]]), "MODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['publish_button_event_count'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Publish button event over the radio");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_led'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize LED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_logging'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Logging");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_info'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Info");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Info"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_warning'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Warning");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Warning"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(45);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_debug'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Debug");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Debug"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(300);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['log_error'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Log Error");
    this.appendDummyInput()
        .appendField("Message:")
        .appendField(new Blockly.FieldTextInput("Error"), "MESSAGE");
    this.appendValueInput("VARIABLE")
        .setCheck(null)
        .appendField("Variable");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_core_module_tmp112'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Core Module Temperature Sensor");
    this.appendDummyInput()
        .appendField("With Update interval")
        .appendField(new Blockly.FieldNumber(5000, 100, 40000), "UPDATE_INTERVAL")
        .appendField("ms");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(345);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['core_temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Core Temperature");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['integer_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Integer")
        .appendField(new Blockly.FieldNumber(0), "VALUE");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['string_value'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("String")
        .appendField(new Blockly.FieldTextInput("text"), "VALUE");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['button_clicks'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Button Clicks");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['button_holds'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Button Holds");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['application_task'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Application Task");
    this.appendDummyInput()
        .appendField("Repeat every")
        .appendField(new Blockly.FieldNumber(1000, 100), "task_interval")
        .appendField("ms");
    this.appendStatementInput("application_task")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_motion_detector'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Motion Detector");
    this.appendDummyInput()
        .appendField("With Sensitivity")
        .appendField(new Blockly.FieldDropdown([["TWR_MODULE_PIR_SENSITIVITY_LOW","TWR_MODULE_PIR_SENSITIVITY_LOW"], ["TWR_MODULE_PIR_SENSITIVITY_MEDIUM","TWR_MODULE_PIR_SENSITIVITY_MEDIUM"], ["TWR_MODULE_PIR_SENSITIVITY_HIGH","TWR_MODULE_PIR_SENSITIVITY_HIGH"], ["TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH","TWR_MODULE_PIR_SENSITIVITY_VERY_HIGH"]]), "SENSITIVITY");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['on_movement'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("On Movement Detected");
    this.appendStatementInput("motion_statements")
        .setCheck(null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_power_module'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize Power Module");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['initialize_led_strip'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize LED Strip");
    this.appendDummyInput()
        .appendField("Number of LEDs: ")
        .appendField(new Blockly.FieldDropdown([["36","36"], ["72","72"], ["144","144"]]), "LEDS");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['power_module_relay_state'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Power Module Relay State");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['power_module_relay_set_state'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Power Module Relay Set State");
    this.appendDummyInput()
        .appendField("State: ")
        .appendField(new Blockly.FieldDropdown([["ON","ON"], ["OFF","OFF"], ["TOGGLE","TOGGLE"]]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
