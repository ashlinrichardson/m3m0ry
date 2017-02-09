// convert unicode to familiar symbol
function unicode_from_key_event(e){
  return e.charCode? e.charCode : e.keyCode;
}

// keyboard status array (unicode format)
var key_unicode = {};

// keyboard handling function
function keyboard_module(){

  // set up key-down event handler 
  document.onkeydown = function(e) {
    var unicode = unicode_from_key_event(e);
    var key =  String.fromCharCode(unicode);
    // console.log('unicode', unicode, 'key', key);
    key_unicode[unicode] = true;

    // when are we?
    var now = ctx.get_state();
    console.log('\tdeja', now.deja, 'unicode', unicode, 'key', key, 'now.txt', now.img_stim, now.wrd_stim); 

    // record the key press if admissible
    var admissible_keys = now.get_admissible_keys();
    if(admissible_keys.includes(unicode)){
      now.record_key_stroke(unicode);
    }

    // by default, transition from a slide upon key-press.
    var go = true; 

    if(now.type=='delay'){
      if(now.wrd_stim ==null){
        now.wrd_stim ='';
      }
      now.wrd_stim += key;
      update();
    }

    // check if this state `requires' keyboard input
    if(now.require_key() == true){
      if(admissible_keys.includes(unicode)){
        if(!(now.deja==undefined)){
          ctx.questions_total+=1;
          if((now.deja==true && unicode ==77)||(now.deja==false && unicode==78)){
            ctx.questions_correct+=1;
          }
          // display message at end of test
          var msg ='Your score: '+ctx.questions_correct.toString()+'/'+ctx.questions_total.toString();
          ctx.last_state.txt2 = msg;

          // reminder to dump data at this point
        }
      }else{
        // block if a key was required but the one entered was not admissible
        go = false;
      }
    }
    if(now && now.key_expiry && go){
         // t <-- t + 1
        console.log('t <-- t+1')
        ctx.clear_tmr();
        now.expire();
    }
  }
  return key_unicode;
}

