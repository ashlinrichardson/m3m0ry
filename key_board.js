/* convert unicode to familiar symbol.. */
function unicode_from_key_event(e){
  return e.charCode? e.charCode : e.keyCode;
}

/* keyboard status array (unicode format).. */
var key_unicode = {};

function keyboard_module(onUpdate) {

  /* key down is sufficient.. Delete elsewhere.. */
  document.onkeydown = function(e) {
    var unicode = unicode_from_key_event(e);
    var key =  String.fromCharCode(unicode);
    key_unicode[unicode] = true;
    if(onUpdate){
      onUpdate(key_unicode);
    }
  }
  return key_unicode;

}


