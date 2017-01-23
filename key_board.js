/* convert unicode to familiar symbol.. */
function unicode_from_key_event(e){
  return e.charCode? e.charCode : e.keyCode;
}

/* keyboard status array (unicode format).. */
var key_unicode = {};

function keyboard_module(){

  /* key down sufficient.. delete record elsewhere.. */
  document.onkeydown = function(e) {
    var unicode = unicode_from_key_event(e);
    var key =  String.fromCharCode(unicode);
    key_unicode[unicode] = true;
    /* start a new life */ 
    var now = ctx.get_state();
    if(now && now.key_expiry){
        ctx.clear_tmr();
        now.expire();
    }
  }
  return key_unicode;
}

