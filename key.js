var bell = new Audio("../../ding.mp3")

/* convert from unicode to familiar symbol */
function unicode_from_key_event(e){
  return e.charCode ? e.charCode : e.keyCode
}

/* keyboard status array (unicode format) */
var key_unicode = {}

/* keyboard event handler function */
function keyboard_module(){

  /* set up key-down event handler function */
  document.onkeydown = function(e){

    /* unicode vs. character representation */
    var unicode = unicode_from_key_event(e), key = String.fromCharCode(unicode)

    /* inverted question mark */
    if(unicode == 191){
      unicode = 63, key = '?'
    }else if(unicode == 188){
      unicode = 44, key = ','  
    }else if(unicode == 190){
      unicode = 46, key = "."
    }
    
    /* console.log("unicode", unicode)*/

    key_unicode[unicode] = true

    var ignore = [20, 192, 189, 187, 93, 91, 219, 221, 220, 186, 222, 33, 36, 34, 35, 37, 38, 39, 40]
  
    /* ignore caps-lock and other special key */
    if(ignore.includes(unicode)){
      return
    }

    /* when are we? */
    var now = ctx.get_state() 

    /* record key press, if admissible */
    var admissible_keys = now.get_admissible_keys()
    if(admissible_keys.includes(unicode) || now.type == 'delay'){
      now.record_key_stroke(unicode)
    }

    /* by default, transition from a slide upon key-press */
    var go = true

    /* special treatment for delay task */
    if(now.type == 'delay'){
      if(now.txt == null){

        /* init */
        now.txt = ''
      }
      if(unicode == 8){
      
        /* backspace */
        var len = now.txt.length
        if(now.txt[len-1] != ' '){
          now.txt = now.txt.substring(0, len - 1)    
        }
      }else if(admissible_keys.includes(27) && unicode==27){

        /* break out of free-form text input mode with <esc> key */
        ctx.clear_tmr()
        now.expire()
        bell.play()
        return key_unicode
      }else{
  
        /* add character to buffer */
        now.txt += key.toLowerCase()
      }

      /* redraw */
      update()
    }

    /* check if this state "requires" keyboard input */
    if(now.require_key() == true){

      /* is the key that was pressed, in the list of "admissible" keys? */
      if(admissible_keys.includes(unicode)){

        /* if we have a "deja-vu" variable, calculate a score */
        if(!(now.deja == undefined)){
          ctx.questions_total += 1

          /* check for N or M keypress */
          if((now.deja == true && unicode == 77) || (now.deja == false && unicode == 78)){
            ctx.questions_correct += 1
          }
        }
      }else{ 
        /* block if a key was required but the one entered was not admissible */
        go = false
      }
    }

    /* t <-- t + 1 */
    if(now && now.key_expiry && go){

        /* clear the timer and "go next" */
        ctx.clear_tmr()
        now.expire()
        if(now.type != 'isi'){
          bell.play()
        }
    }
  }
  return key_unicode
}
