var toolbox = document.getElementById("toolbox");

var options = { 
	toolbox : toolbox, 
	collapse : false, 
	comments : false, 
	disable : false, 
	maxBlocks : Infinity, 
	trashcan : false, 
	horizontalLayout : false, 
	toolboxPosition : 'start', 
	css : true, 
	media : 'https://blockly-demo.appspot.com/static/media/', 
	rtl : false, 
	scrollbars : false, 
	sounds : true, 
	oneBasedIndex : true,
};

var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = Blockly.inject('blocklyDiv', options);
var onresize = function(e) {
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

function checkUniqueBlock(block_type, event){
  for (const block of workspace.blockDB.values()) {
    if(block.hue_ == null) {
      continue;
    }
    if(block.type == block_type && block.id != event.ids[0]) {
      workspace.getBlockById(event.ids[0]).dispose()
      return true;
    }
  }
  return false;
}

function checkCategories() {
  for (const category of workspace.toolbox_.contents_) {
    if(category.name_ != 'Initialization' && category.name_ != 'Values' && category.name_ != 'Variables' && category.name_ != 'Controls' && category.name_ != 'Logic' && category.name_ != 'Math') {
      document.getElementById(category.id_).style.display = 'none';
    }
  }
  for (const block of workspace.blockDB.values()) {
    if(block.type == 'initialize_button') {
      document.getElementById('blockly-2').style.display = '';
    }
    else if(block.type == 'initialize_radio') {
      document.getElementById('blockly-3').style.display = '';
    }
    else if(block.type == 'initialize_led') {
      document.getElementById('blockly-4').style.display = '';
    }
    else if(block.type == 'initialize_logging') {
      document.getElementById('blockly-5').style.display = '';
    }
    else if(block.type == 'initialize_core_module_tmp112') {
      document.getElementById('blockly-6').style.display = '';
    }
    else if(block.type == 'initialize_motion_detector') {
      document.getElementById('blockly-7').style.display = '';
    }
    else if(block.type == 'initialize_power_module') {
      document.getElementById('blockly-8').style.display = '';
    }
    else if(block.type == 'initialize_lcd') {
      document.getElementById('blockly-9').style.display = '';
    }
  }
}

function checkBlocks() {
  for (const block of workspace.blockDB.values()) {
    console.log(block);
    if(block.type == 'initialize_button') {
      document.getElementById('blockly-2').style.display = '';
    }
  }
}

function onBlockEvent(event) {
  if (event.type == Blockly.Events.BLOCK_CREATE) {
    
    if(workspace.getBlockById(event.ids[0]).type.includes('init')) {
      if(checkUniqueBlock(workspace.getBlockById(event.ids[0]).type, event)) {
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
}

function exportWorkspace() {
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToPrettyText(xml);
  var blob = new Blob([xml_text], {type: "text/plain;charset=utf-8"});

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
  reader.onload = function(e) {
    var contents = e.target.result;
    var xml = Blockly.Xml.textToDom(contents);
    Blockly.Xml.domToWorkspace(xml, workspace);
  };
  reader.readAsText(file);
}

workspace.addChangeListener(onBlockEvent);

function save(){
  if(typeof(Storage) !== "undefined") {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("workspace", Blockly.Xml.domToText(xml));
  }
}

function restore(){
  Blockly.getMainWorkspace().clear();
  var nameOfTheProject = "workspace";
  if(typeof(Storage) !== "undefined") {
    if(localStorage.length > 0) {
      console.log("NOT NULL");
      var xml = Blockly.Xml.textToDom(localStorage.getItem(nameOfTheProject));
      console.log(xml);
      Blockly.Xml.domToWorkspace(xml, Blockly.getMainWorkspace());
      console.log("restored");
    }
  }
}

async function connectDevices()
{
  navigator.serial.requestPort();
}

function exportJSON()
{
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