var state_id = -1  // state: generic object representing a trial..
function get_id(){
  state_id += 1;
  return state_id;
}
function get_ctx(){
  return document.getElementsByTagName("canvas")[0].getContext("2d"); 
}
function state(expiry_ms  =     0,  // max. presentation time (mS)     
               key_expiry =  true,  // expiry by key-press (true <--> on)
               intvl_ms   =     0,  // interval btwn stimuli.. (ISI) `blank slide'
               img_idx    =    -1,  //image data (if any)
               txt    =    null,  //text data (if any)
              successor = null){
  this.action = null
  this.ding = false
  var ctx = get_ctx()
  this.hold = false
  this.hold_on = function(){
    this.hold = true
  }
  this.id = get_id()
  this.key_required = false
  this.admissible_keys = [77,78]  // array for storing admissible key-codes for data entry or transition to next slide
  this.get_admissible_keys = function(){
    return this.admissible_keys
  }
  this.clear_admissible_keys = function(){
    this.admissible_keys = new Array()
  }
  this.add_admissible_key = function(k){
    this.admissible_keys.push(k)
  }
  this.key_strokes = new Array()  // this array will record the keystroke data received while residing in this state
  this.record_key_stroke = function(k){
    this.key_strokes.push(k)
  }

  if(ctx.first_new_state == null){  // keep a reference to this state (if it's the first one ever..)
    ctx.first_new_state = this
  }  // leaves (trials) default to parent params? should be equal anyways.
  this.intvl_ms = intvl_ms  //only applies if there's a `next' trial.. (if this is a trial).
  this.expiry_ms = expiry_ms  // numeric 
  this.key_expiry = key_expiry  // boolean
  this.img_idx = img_idx  // global image index (images added as member of ctx).
  this.successor = null  
  this.require_key = function(){
    return this.key_required
  }
  this.predecessor = ctx.last_new_state;
  var id = this.predecessor == null ? -1 : this.predecessor.id 
  console.log(this.id, 'predecessor=', id, this.predecessor)
  ctx.last_new_state = this
  if(this.predecessor != null){
    this.predecessor.set_successor(this)
  } 
  this.set_successor = function(s){  // where are we going?
    this.successor = s
  }
  this.show = function(){  // pl0t t3xt 0r 1mag3s
    if(this.action){
      this.action(this)
    }
    var ctx = get_ctx()
    ctx.clearRect(0, 0, ctx.w(), ctx.h())
    if(this.txt2 && (!this.wrd_stim)){  // 3) bottom text
      //wrap_text(this.txt2, ctx, ctx.h() - (2 * ctx.font_size+20));
    }
    if(this.txt2){
      wrap_text(this.txt2, ctx, ctx.h() - (2 * ctx.font_size + 20))
    }
    if(this.txt){  // 1) draw upper text. // centre_text(this.txt);
      wrap_text(this.txt, ctx, 0)
    }
    if(this.img_stim){  // 2) img or middle text (if word stim)
      x = this.img_stim
      draw_img(x, ctx)  
    }
    if(this.wrd_stim!=null){  //might need the wrap_text back on for long strings..:
      //  wrap_text(this.wrd_stim, ctx, ctx.h()/2);
      centre_text(this.wrd_stim)  // no wrap
    }
    if(!this.txt2){  // 4) logo if no image/ lower text present (add conditional)..
      ctx.draw_symbol() // need this line?
    }
  }
  this.set_expiry = function(t_ms){  // state expires by timer or key-press
    this.expiry_ms = t_ms  // follow clock or key to keep the show going
    if(t_ms <= 0){  // state expires by key press 
      this.key_expiry = true
    }
  }
  this.start = function(){  // 3nt3r 4 5t4t3 (begin)..
    var ctx = get_ctx()
    this.t0 = window.performance.now()  // st4rt th3 cl0ck
    this.start_date_time = date_time()
    ctx.clear_tmr()  // cl34r th3 t1m3r
    this.show(ctx)  // plot the current trial 
    if(this.expiry_ms > 0){  // maybe start timer ?
      ctx.init_tmr(this.expiry_ms, this.expire)
    }
    return null
  }
  this.expire = function(){  // pr0c33d t0 n3x+ st4+3
    var ctx = get_ctx()
    ctx.clear_tmr()  // 5t0p 4ll th3 cl0ck5
    this.end_date_time = date_time()  //record stop time 
    this.t1 = window.performance.now()
    var txt = this.txt, suc_txt = null, suc = this.successor

    if(suc!=null && suc.txt !=null){
      suc_txt = suc.txt
    }
    if(this.successor!=null){  // enter next state
      ctx.set_state(this.successor)
      ctx.get_state().start()
    }else{
        console.log('blank')
    } 
    // now that this `event' is ending, 
    // 1) record our data to the global csv-line record.
    // 2) proceed to the next state.
  }
  this.data = function(){  // print out the data for the object.. duration in state (ms): not more than one decimal place
    var dt = Math.round(10. * (this.t1 - this.t0)) / 10., dt_0 = parse_date_time(this.start_date_time), dt_1 = parse_date_time(this.end_date_time) 
    p = function(s){  // csv record
      return s.toString() + ','
    }
    s = trim(p(dt) + p(dt_0) + dt_1.toString())
    return(s) 
  }
  this.fields = function(){  // descriptive csv header (mls: milliseconds-- three digits)
    return 't(mS),start(yyyy:mm:dd:hh:mn:ss:mls),end(yyyy:mm:dd:hh:mn:ss:mls)';
  }
  return this
}
/* 
- collect any key presses. 
- record data to global record..
- reset keymap... 
- random selection: extra feedback on subsample of trials?  
*/
