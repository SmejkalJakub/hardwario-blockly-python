var toolbox = document.getElementById("toolbox");

var options = {
  toolbox: toolbox,
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: false,
  horizontalLayout: false,
  toolboxPosition: 'start',
  css: true,
  media: 'https://blockly-demo.appspot.com/static/media/',
  rtl: false,
  scrollbars: true,
  sounds: true,
  oneBasedIndex: true,
};

// On page load function
window.addEventListener('load', switch_code);

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv', options);
var onresize = function (e) {
  // Compute the absolute coordinates and dimensions of blocklyArea.
  var element = blocklyArea;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  // Position blocklyDiv over blocklyArea.
  blocklyDiv.style.left = x + 'px';
  blocklyDiv.style.top = y + 'px';
  blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
  blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
  Blockly.svgResize(workspace);
};
window.addEventListener('resize', onresize, false);
onresize();
Blockly.svgResize(workspace);

/* Inject your workspace */

checkCategories();

workspace.registerButtonCallback('createInteger', createIntegerVariable)

function createIntegerVariable() {
  Blockly.Variables.createVariableButtonHandler(workspace, null, 'Integer');
}

workspace.registerButtonCallback('createFloat', createFloatVariable)

function createFloatVariable() {
  Blockly.Variables.createVariableButtonHandler(workspace, null, 'Float');
}

// Returns an arry of XML nodes.
var integerVariablesFlyout = function (workspace) {
  var integerVariablesList = workspace.getVariablesOfType('Integer');
  var blockList = [];
  var button = document.createElement('button');
  button.setAttribute('text', 'Create Integer');
  button.setAttribute('callbackKey', 'createInteger');

  blockList.push(button);

  if (integerVariablesList.length != 0) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_set_integer');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', integerVariablesList[0].getId());
    field.setAttribute('variabletype', 'Integer');
    field.innerText = integerVariablesList[0].name;
    block.appendChild(field);
    blockList.push(block);
  }

  for (var i = 0; i < integerVariablesList.length; i++) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_get_integer');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', integerVariablesList[i].getId());
    field.setAttribute('variabletype', 'Integer');
    field.innerText = integerVariablesList[i].name;
    block.appendChild(field);
    blockList.push(block);
  }
  return blockList;
};

var floatVariablesFlyout = function (workspace) {
  var floatVariablesList = workspace.getVariablesOfType('Float');
  var blockList = [];

  var button = document.createElement('button');
  button.setAttribute('text', 'Create Float');
  button.setAttribute('callbackKey', 'createFloat');

  blockList.push(button);

  if (floatVariablesList.length != 0) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_set_float');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', floatVariablesList[0].getId());
    field.setAttribute('variabletype', 'Float');
    field.innerText = floatVariablesList[0].name;
    block.appendChild(field);
    blockList.push(block);
  }

  for (var i = 0; i < floatVariablesList.length; i++) {
    var block = document.createElement('block');
    block.setAttribute('type', 'variables_get_float');
    var field = document.createElement('field');
    field.setAttribute('name', 'VAR');
    field.setAttribute('id', floatVariablesList[i].getId());
    field.setAttribute('variabletype', 'Float');
    field.innerText = floatVariablesList[i].name;
    block.appendChild(field);
    blockList.push(block);
  }
  return blockList;
};

workspace.registerToolboxCategoryCallback(
  'INTEGER_PALETTE', integerVariablesFlyout);

workspace.registerToolboxCategoryCallback(
  'FLOAT_PALETTE', floatVariablesFlyout);

function checkUniqueBlock(block_type, event) {
  for (const block of workspace.blockDB.values()) {
    if (block.hue_ == null) {
      continue;
    }
    if (block.type == block_type && block.id != event.ids[0]) {
      workspace.getBlockById(event.ids[0]).dispose()
      return true;
    }
  }
  return false;
}

function checkCategories() {
  for (const category of workspace.toolbox_.contents_) {
    if (category.name_ != 'Initialization' && category.name_ != 'Values' && category.name_ != 'Variables'
      && category.name_ != 'Task' && category.name_ != 'Logic' && category.name_ != 'Math' && category.name_ != 'Loops' 
      && category.name_ != 'Integer Variables' && category.name_ != 'Float Variables') {
      document.getElementById(category.id_).style.display = 'none';
    }
  }
  for (const block of workspace.blockDB.values()) {
    if (block.type == 'hio_button_initialize') {
      document.getElementById('blockly-2').style.display = '';
      //workspace.createVariable('button_click_count', 'Integer');
      //workspace.createVariable('button_hold_count', 'Integer');
    }
    else if (block.type == 'hio_radio_initialize') {
      document.getElementById('blockly-3').style.display = '';
    }
    else if (block.type == 'hio_led_initialize') {
      document.getElementById('blockly-4').style.display = '';
    }
    else if (block.type == 'hio_logging_initialize') {
      document.getElementById('blockly-5').style.display = '';
    }
    else if (block.type == 'hio_coreTmp112_initialize') {
      workspace.createVariable('core_tmp112_value', 'Float');
      document.getElementById('blockly-6').style.display = '';
    }
    else if (block.type == 'hio_pir_initialize') {
      document.getElementById('blockly-7').style.display = '';
    }
    else if (block.type == 'hio_power_initialize') {
      document.getElementById('blockly-8').style.display = '';
    }
    else if (block.type == 'hio_lcd_initialize') {
      document.getElementById('blockly-9').style.display = '';
    }
    else if (block.type == 'hio_climate_initialize') {
      workspace.createVariable('climate_temperature_value', 'Float');
      workspace.createVariable('climate_humidity_value', 'Float');
      workspace.createVariable('climate_illuminance_value', 'Float');
      workspace.createVariable('climate_pressure_value', 'Float');
      workspace.createVariable('climate_altitude_value', 'Float');
      document.getElementById('blockly-a').style.display = '';
    }
    else if(block.type == 'hio_battery_initialize'){
      document.getElementById('blockly-b').style.display = '';
      workspace.createVariable('battery_voltage_value', 'Float');
    }
  }
}

function checkBlocks() {
  for (const block of workspace.blockDB.values()) {
    console.log(block);
    if (block.type == 'hio_button_initialize') {
      document.getElementById('blockly-2').style.display = '';
    }
  }
}

function onBlockEvent(event) {
  if (event.type == Blockly.Events.BLOCK_CREATE) {

    if (workspace.getBlockById(event.ids[0]).type.includes('init')) {
      if (checkUniqueBlock(workspace.getBlockById(event.ids[0]).type, event)) {
        return;
      }
      else {
        checkCategories();
        checkBlocks();
      }
    }
  }
  else if (event.type == Blockly.Events.BLOCK_DELETE) {
    checkCategories();
  }
  if (event.type == Blockly.Events.BLOCK_MOVE) {
    console.log("block moved");
  }
  if(event.type == Blockly.Events.BLOCK_CREATE || event.type == Blockly.Events.BLOCK_DELETE ||
    event.type == Blockly.Events.BLOCK_CHANGE || event.type == Blockly.Events.BLOCK_MOVE ||
    event.type == Blockly.Events.VAR_CREATE || event.type == Blockly.Events.VAR_DELETE ||
    event.type == Blockly.Events.VAR_RENAME) {
    update_code();
  }
}

function switch_code() {
  var switch_button = document.getElementById("switch_code_button");
  var code_div = document.getElementById("code-div");
  if (code_div.style.display === "none") {
    switch_button.innerText = "Hide Code";
    code_div.style.display = "block";
    $(".grid-container").css("display","grid").css("grid-template-columns","1fr 1fr");
  } else {
    switch_button.innerText = "Show Code";
    code_div.style.display = "none";
    $(".grid-container").css("display","grid").css("grid-template-columns","1fr");
  }
  onresize();

  var text, parser, xmlDoc;

  text = "<bookstore><book>" +
  "<title>Everyday Italian</title>" +
  "<author>Giada De Laurentiis</author>" +
  "<year>2005</year>" +
  "</book></bookstore>";

  parser = new DOMParser();
  xmlDoc = parser.parseFromString(text,"text/xml");

  document.getElementById("toolbox").innerHTML = xmlDoc.toString();
}

function update_code() {
  $.ajax({
    url: "/update_code",
    type: "GET",
        data: {
        Code: exportJSON(),
    },

  }).done(function(data) {
    data = data.replace(/</g, '&lt;');
    data = data.replace(/>/g, '&gt;');
    data = data.replace(/(?:\r\n|\r|\n)/g, '<br>');
    data = data.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    document.getElementById("code").innerHTML = data;
  });
}

function exportWorkspace() {
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToPrettyText(xml);
  var blob = new Blob([xml_text], { type: "text/plain;charset=utf-8" });

  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  link.href = url
  link.download = "workspace.xml"
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

function importWorkspace() {
  Blockly.getMainWorkspace().clear()
  var file = document.getElementById('importFile').files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var contents = e.target.result;
    var xml = Blockly.Xml.textToDom(contents);
    Blockly.Xml.domToWorkspace(xml, workspace);
  };
  reader.readAsText(file);
}

workspace.addChangeListener(onBlockEvent);

function save() {
  if (typeof (Storage) !== "undefined") {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("workspace", Blockly.Xml.domToText(xml));
  }
}

function restore() {
  Blockly.getMainWorkspace().clear();
  var nameOfTheProject = "workspace";
  if (typeof (Storage) !== "undefined") {
    if (localStorage.length > 0) {
      console.log("NOT NULL");
      var xml = Blockly.Xml.textToDom(localStorage.getItem(nameOfTheProject));
      console.log(xml);
      Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
      console.log("restored");
    }
  }
}

async function connectDevices() {
  navigator.serial.requestPort();
}

function exportJSON() {
  var jsonOriginal = Blockly.serialization.workspaces.save(workspace);

  var json = JSON.stringify(jsonOriginal);

  return json;

  /*json = [json];
  var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

  var isIE = false || !!document.documentMode;
  if (isIE) {
      window.navigator.msSaveBlob(blob1, "code.json");
  } else {
      var url = window.URL || window.webkitURL;
      link = url.createObjectURL(blob1);
      var a = document.createElement("a");
      a.download = "code.json";
      a.href = link;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }*/
}