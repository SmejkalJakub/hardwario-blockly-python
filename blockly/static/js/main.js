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
	oneBasedIndex : true
};

/* Inject your workspace */ 
var workspace = Blockly.inject('blocklyDiv', options);

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
    if(category.id_ != 'blockly-0' && category.id_ != 'blockly-6') {
      document.getElementById(category.id_).style.display = 'none';
    }
  }
  for (const block of workspace.blockDB.values()) {
    if(block.type == 'initialize_button') {
      document.getElementById('blockly-1').style.display = '';
    }
    else if(block.type == 'initialize_radio') {
      document.getElementById('blockly-2').style.display = '';
    }
    else if(block.type == 'initialize_led') {
      document.getElementById('blockly-3').style.display = '';
    }
    else if(block.type == 'initialize_logging') {
      document.getElementById('blockly-4').style.display = '';
    }
    else if(block.type == 'initialize_core_module_tmp112') {
      document.getElementById('blockly-5').style.display = '';
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

workspace.addChangeListener(onBlockEvent);

/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
//var workspaceBlocks = document.getElementById("workspaceBlocks"); 

/* Load blocks to workspace. */
//Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);

function save(){
  if(typeof(Storage) !== "undefined") {
    var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
    localStorage.setItem("test", Blockly.Xml.domToText(xml));
    console.log("backuped");
    Blockly.getMainWorkspace().clear();
  }
}

function restore(){
  Blockly.getMainWorkspace().clear();
  var nameOfTheProject = "test";
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