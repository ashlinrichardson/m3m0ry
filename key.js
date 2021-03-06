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
    }else if(unicode == 13){

      /* replace enter with space */
      unicode = 32, key = " "
    }

    if(unicode == 27){

      /* do nothing if we get a key that is code 27, but not an escape key.. */
      if(!(e.key == "Escape" || e.key == "Esc")){
        return;
      }
    }

    if(unicode == 222){
      unicode = 39, key ="'"
    }

    /* console.log("unicode", unicode) */

    key_unicode[unicode] = true

    var ignore = [20, 192, 189, 187, 93, 91, 219, 221, 222, 220, 186, 33, 36, 34, 35, 37, 38, 40]

    /* ignore caps-lock and other special key */
    if(ignore.includes(unicode)){
      return
    }

    var allow = [];
    for(var i=65; i<=90; i++){
      allow.push(i);
    }
    for(var i=48; i<=57; i++){
      allow.push(i);
    }

    /* allow space bar */
    allow.push(32)

    /* allow escape key */
    allow.push(27)

    /* allow comma */
    allow.push(44)

    /* allow period */
    allow.push(46)

    /* allow question mark */
    allow.push(63)

    /* allow backspace */
    allow.push(8)

    /* allow single right quotation mark */
    allow.push(39)

    if(!allow.includes(unicode)){
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
        now.txt = now.txt.substring(0, len - 1)

      }else if(admissible_keys.includes(27) && unicode == 27){

        /* break out of free-form text input mode with <esc> key */
        ctx.clear_tmr()
        now.expire()

        return key_unicode

      }else{

         /* add character to buffer */
        if(unicode >= 65 && unicode <= 90){
          now.txt += key.toLowerCase()
        }else{
          now.txt += key
        }
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
    }
  }
  return key_unicode
}