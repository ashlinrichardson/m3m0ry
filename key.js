// convert unicode to familiar symbol
function unicode_from_key_event(e){
  return e.charCode? e.charCode : e.keyCode;
}

// keyboard status array (unicode format)
var key_unicode = {};

function keyboard_module(){

  // set up key-down event handler 
  document.onkeydown = function(e) {
    var unicode = unicode_from_key_event(e);
    var key =  String.fromCharCode(unicode);
    console.log('unicode', unicode, 'key', key);
    key_unicode[unicode] = true;

    // when are we?
    var now = ctx.get_state();
    var go = true;
    if(now.require_key()){
      if(unicode == 77 || unicode ==78){
        go = true;
      }else{
        go = false;
      }
    }
    console.log(go);    
    if(now && now.key_expiry && go){
         // t <-- t + 1
        ctx.clear_tmr();
        now.expire();
    }
  }// document.onkeydown

  return key_unicode;
}

