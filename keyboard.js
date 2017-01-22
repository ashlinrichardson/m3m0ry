/* convert unicode to familiar symbol.. */
function unicode_from_key_event(e){
  return e.charCode? e.charCode : e.keyCode;
}

/* keyboard status array (unicode format).. */
var unicode_map = {};

/* keyboard status array (readable format).. */
var kb_map = {};

function keyboard_module(onUpdate) {

  /* key down is sufficient.. Delete elsewhere.. */
  document.onkeydown = function(e) {
    var unicode = unicode_from_key_event(e);
    var key =  String.fromCharCode(unicode);
    kb_map[key] = true;
    unicode_map[unicode] = true;
    if(onUpdate){
      onUpdate(kb_map, unicode_map);
    }
  }
  return kb_map, unicode_map;

}


