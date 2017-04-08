function unicode_from_key_event(e){  // convert unicode to familiar symbol
  return e.charCode? e.charCode : e.keyCode
}
var key_unicode = {}  // keyboard status array (unicode format)
function keyboard_module(){  // keyboard handling function
  document.onkeydown = function(e){  // set up key-down event handler
    var unicode = unicode_from_key_event(e), key =  String.fromCharCode(unicode)
    key_unicode[unicode] = true

    var now = ctx.get_state()  // when are we?
    console.log('\tding', now.ding, 'hold', now.hold, 'unicode', unicode, 'key', key, 'now.txt', now.img_stim, now.wrd_stim)

    var admissible_keys = now.get_admissible_keys()  // record the key press if admissible
    if(admissible_keys.includes(unicode)){
      now.record_key_stroke(unicode)
    }
    var go = true  // by default, transition from a slide upon key-press
    if(now.type=='delay'){
      if(now.txt ==null){
        now.txt =''
      }
      if(unicode ==8 ){
        var len = now.txt.length
        if(now.txt[len-1] != ' '){
          now.txt = now.txt.substring(0, len - 1)    
        }
      }else if(unicode == 0){ 
      }else{
        now.txt += key.toLowerCase()
      }
      update()
    }
    if(now.require_key() == true){  // check if this state `requires' keyboard input
      if(admissible_keys.includes(unicode)){
        if(!(now.deja == undefined)){
          ctx.questions_total += 1
          if((now.deja == true && unicode == 77)||(now.deja == false && unicode == 78)){
            ctx.questions_correct += 1
          }
          // reminder to dump data at this point
        }
      }else{  // block if a key was required but the one entered was not admissible
        go = false
      }
    }
    if(now.ding==false && now.hold==true){
      go = false
    }
    if(now && now.key_expiry && go){  // t <-- t + 1
        ctx.clear_tmr()
        now.expire()
    }
  }
  return key_unicode
}
