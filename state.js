/* global counter for states/ AKA frames/ AKA slides */
var last_state_id = -1

/* reference to 2d canvas graphics context */
function get_ctx(){
  return canvas.getContext("2d") //document.getElementsByTagName("canvas")[0].getContext("2d");
}

/* state: generic object representing trial (like a card in "hypercard") */
function state(expiry_ms  =     0,  /* max. presentation time (mS) */
               key_expiry =  true,  /* force expiry by key-press (true <--> on) */
               intvl_ms   =     0,  /* interval btwn stimuli.. (ISI) `blank slide' */
               img_idx    =    -1,  /* image data (if any) */
               txt        =  null,  /* text data (if any) */
               successor  =  null){
  var ctx = get_ctx()
  this.action = null, this.ding = false, this.id = ++ last_state_id

  /* is a key-press required to transition? */
  this.key_required = false

  /* array to store admissible key-codes for data entry or transition to next "slide":
    default: M, N */
  this.admissible_keys = [77, 78]

  this.get_admissible_keys = function(){
    return this.admissible_keys
  }

  this.clear_admissible_keys = function(){
    this.admissible_keys = new Array()
  }

  this.add_admissible_key = function(k){
    this.admissible_keys.push(k)
  }

  /* this array will record the keystroke data received while residing in this state */
  this.key_strokes = new Array()

  this.record_key_stroke = function(k){
    this.key_strokes.push(k)
  }

  this.set_pool_id = function(pid){
    this.pool_id = pid
  }

  this.get_pool_id = function(){
    return this.pool_id ? this.pool_id : ""
  }

  /* keep a reference to this state, if it's the first one ever.. */
  if(ctx.first_new_state == null){
    ctx.first_new_state = this
  }

  /* only applies if there's a "next" trial, if this is a trial */
  this.intvl_ms = intvl_ms

  /* numeric */
  this.expiry_ms = expiry_ms

  /* boolean */
  this.key_expiry = key_expiry

  /* global image index (images added as member of ctx) */
  this.img_idx = img_idx, this.successor = null, this.predecessor = ctx.last_new_state

  this.require_key = function(){
    return this.key_required
  }

  var id = (this.predecessor == null) ? -1 : this.predecessor.id
  ctx.last_new_state = this

  /* sanity check: make sure the predecessor points here */
  if(this.predecessor){
    this.predecessor.set_successor(this)
  }

  /* where are we going? */
  this.set_successor = function(s){
    this.successor = s
  }

  /* plot text or images */
  this.show = function(){

    /* execute associated action, if we have one */
    if(this.action){
      this.action(this)
    }
    var ctx = get_ctx()
    ctx.clearRect(0, 0, ctx.w(), ctx.h())

    /* upper text */
    if(this.txt){
      wrap_text(this.txt, ctx, 0)
    }

    /* middle text */
    if(this.txt2){
      wrap_text(this.txt2, ctx, ctx.h() - (2 * ctx.font_size + 20))
    }

    /* img or middle text (if word stim) */
    if(this.img_stim){
      draw_img(this.img_stim, ctx)
    }

    /* might need the wrap_text back on for long strings.. */
    if(this.wrd_stim){

      /* no wrap */
      centre_text(this.wrd_stim)
    }

    /* logo of no image/ lower text present */
    if(!this.txt2){
      ctx.draw_symbol()
    }
  }

  /* state expires by timer or key press */
  this.set_expiry = function(t_ms){

    /* follow clock or key to keep the show going */
    this.expiry_ms = t_ms

    /* state expires by key press */
    if(t_ms <= 0){
      this.key_expiry = true
    }
  }

  /* enter a state (begin) */
  this.start = function(){
    var ctx = get_ctx()

    /* start the clock.. */
    this.t0 = window.performance.now(), this.start_date_time = date_time()

    /* do data dump, if we're at the end */
    if(this.id >= last_state_id){ //== ctx.last_state){

        /* window.location.href == http://domain/memory/examples/test_phase/memory.html */
        var href = window.location.href

        /* go through all the states and record (in string format) the info we'd like to appear on the server */
        var state_i = ctx.first_state, state_index = 0, message = "url,event_id,task_id,task_type,trial_id,duration(mS),start(yyyy:mm:dd:hh:mn:ss:mls),end(yyyy:mm:dd:hh:mn:ss:mls),isi,set,stim_type,stim_id,stim_pool_id,response\n"
        for(var state_i = ctx.first_state; state_i != ctx.last_state; state_i = state_i.successor){

          var stim_type = null, my_stim  = null, pi = ""

          /* "the right way to check if a variable is undefined or not" */
          if(typeof state_i.pool_id !== 'undefined'){
            pi = JSON.parse(JSON.stringify(state_i.pool_id))
          }

          /* assign "stimulus type" keyword */
          if(state_i.wrd_stim){
            stim_type = "word", my_stim = state_i.wrd_stim
          }
          if(state_i.img_stim){
            stim_type = "image", my_stim = state_i.img_stim.fn
          }
          if(!stim_type){
            stim_type = ""
          }
          if(!my_stim){
            my_stim = ""
          }

          /* for a given "state", record a line of data */
          message += href + ","

          /* event_id: global index / line number */
          message += state_index.toString() + ","

          /* task_id */
          message += state_i.task_id + ","

          /* task_type */
          message += state_i.type + ","

          /* trial_id */
          message += state_i.trial_id + ","
          message += Math.round(10. * (state_i.t1 - state_i.t0)) / 10. + ","
          message += parse_date_time(state_i.start_date_time).toString() + ","
          message += parse_date_time(state_i.end_date_time).toString() + ","

          /* ISI */
          if(state_i.type == 'isi'){
            message += state_i.expiry_ms.toString()
          }
          message += ","

          if(!state_i.expiry_ms){
            state_i.expiry_ms = ""
          }

          /* SET */
          message += state_i.expiry_ms.toString() + ","

          /* stimulus type */
          message += stim_type.toString() + ","

          /* stimulus id */
          message += my_stim.toString() + ","

          /* stimulus-pool id */
          message += pi.toString() + ","

          /* user response */
          var response = '"'

          if(state_i.type == 'delay'){

            /* use the response text (not the sequence of characters). When testing with Max, discovered we could see a symbol for each keystroke, in the data stream (incl., e.g., backspace characters). We want the final result, not the intermediary. */
            response += state_i.txt
          }else{

            /* write out the individual response key(s) in terms of the representative characters */
            for(var k in state_i.key_strokes){
              response += String.fromCharCode(state_i.key_strokes[k])
            }
          }
          message += response + '"'
          if(response=='""'){
            response = ''
          }

          /* filter the response data for possible newline characters */
          response.replace('\n', ' ')

          /* add a newline character */
          message += "\n"

          /* go next */
          ++ state_index
        }

        /* remove last three elements from array: take current page and navigate to:
          ../../xml-receive.py == http://domain/memory/xml-receive.py */
        var words = href.split('/')
        var nwords = words.length
        var target = words.splice(0, nwords-3).join('/') + '/xml-receive.py'

        /* send the message to the server-side script at URL: target */
        xml_send(message, target)
    }

    /* clear the timer */
    ctx.clear_tmr()

    /* plot the current trial */
    this.show(ctx)

    /* start the timer? */
    if(this.expiry_ms > 0){
      ctx.init_tmr(this.expiry_ms, this.expire)
    }
    return null
  }

  /* pr0c33d t0 th3 n3xt 5+4t3 */
  this.expire = function(){
    var ctx = get_ctx()

    /* st0p 4ll th3 cl0ck5 */
    ctx.clear_tmr()

    /* r3c0rd st0p t1m3 */
    this.end_date_time = date_time(), this.t1 = window.performance.now()
    var txt = this.txt, suc_txt = null, suc = this.successor

    if(suc && suc.txt){
      suc_txt = suc.txt
    }

    /* enter next state */
    if(this.successor && (this.successor!=this)){
      ctx.set_state(this.successor)
      ctx.get_state().start()
    }
  }
  return this
}