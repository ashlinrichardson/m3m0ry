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
    console.log('\tdeja', now.deja, 'unicode', unicode, 'key', key, 'now.txt', now.img_stim, now.wrd_stim); 

    // record the key press 
    // if key expiry, only one key press recorded
    //   otherwise, multiple keys are recorded, in order
    var admissible_keys = now.get_admissible_keys();
    if(admissible_keys.includes(unicode)){
      now.record_key_stroke(unicode);
    }

    var go = true; 

    if(now.require_key()){
      if(admissible_keys.includes(unicode)){
        if(!(now.deja==undefined)){
          ctx.questions_total+=1;
          if((now.deja==true && unicode ==77)||(now.deja==false && unicode==78)){
            ctx.questions_correct+=1;
          }
          var msg ='Your score: '+ctx.questions_correct.toString()+'/'+ctx.questions_total.toString();
          ctx.last_state.txt2 = msg;
        }
        go = true;
      }else{
        go = false;
      }
    }
    //console.log(go);    
    if(now && now.key_expiry && go){
         // t <-- t + 1
        ctx.clear_tmr();
        now.expire();
    }
  }// document.onkeydown

  return key_unicode;
}

