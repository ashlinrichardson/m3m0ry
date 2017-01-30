/* state: generic object representing a trial.. */ 
function state(ctx,                 // meta4 graphics context
               expiry_ms  =     0,    // max. presentation time (mS)     
               key_expiry =  true, // expiry by key-press (true <--> on)
               intvl_ms   =     0,    // interval btwn stimuli.. (ISI) `blank slide'
               img_idx    =    -1,     //image data (if any)
               txt    =    null,      //text data (if any)
                successor = null){
  
//  console.log('state', txt);

  // keep a reference to this state (if it's the first one ever..) 
  if(ctx.first_new_state == null){
    ctx.first_new_state = this;
  } 
  // leaves (trials) default to parent params? should be equal anyways.
  this.ctx = ctx; // reference to graphics context  
  this.intvl_ms = intvl_ms; //only applies if there's a `next' trial.. (if this is a trial).
  this.expiry_ms = expiry_ms; // numeric 
  this.key_expiry = key_expiry; // boolean
  this.img_idx = img_idx; // global image index (images added as member of ctx).
  this.successor = null;  
  this.require_key = function(){
    return this.key_required;
  };

  // 
  this.predecessor = ctx.last_new_state;
  ctx.last_new_state = this;
  if(this.predecessor != null){
    this.predecessor.set_successor(this);
  } 

  // where are we going?
  this.set_successor = function(s){
    this.successor=s;
  };

  // pl0t t3xt 0r 1mag3s 
  this.show = function(){
    var ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.w(), ctx.h());
    // 3) bottom text
    if(this.txt2 && (!this.wrd_stim)){
      //wrap_text(this.txt2, this.ctx, this.ctx.h() - (2* this.ctx.font_size+20));
    }
    if(this.txt2){
      wrap_text(this.txt2, this.ctx, this.ctx.h() - (2* this.ctx.font_size+20));
    }
    // 1) draw upper text.
    if(this.txt) // centre_text(this.txt);
      wrap_text(this.txt, this.ctx, 0);

    // 2) img or middle text (if word stim)
    //var x = ctx.imgs[4]; // what is the data here?
    if(this.img_stim){
      x = this.img_stim;
      draw_img(x, ctx);  
    }
  
    if(this.wrd_stim){
      //console.log('word stim');
      //might need the wrap_text back on for long strings..:
      //  wrap_text(this.wrd_stim, this.ctx, this.ctx.h()/2);

      //for now, centre justif (doesn't wrap)...
      centre_text(this.wrd_stim);

    }
    // 4) logo if no image/ lower text present (add conditional)..
    if(!this.txt2){
      ctx.draw_symbol(); // need this line?
    }
  };

  // state expires by timer or key-press 
  this.set_expiry = function(t_ms){

    // follow clock or key to keep the show going
    this.expiry_ms = t_ms;

    if(t_ms <= 0){
      // state expires by key press 
      this.key_expiry = true;
    }
  };

  // 3nt3r 4 5t4t3 (begin)..
  this.start = function(){

    // st4rt th3 cl0ck
    this.t0 = window.performance.now(); 
    this.start_date_time = date_time(); 
    this.ctx.clear_tmr(); // cl34r th3 t1m3r
    this.show(this.ctx); // plot the current trial 
    
    // maybe start timer ?
    if(this.expiry_ms > 0){
      ctx.init_tmr(this.expiry_ms, this.expire);
    }
    return null;
  };
  
  // pr0c33d t0 n3x+ st4+3
  this.expire = function(){
    // 5t0p 4ll th3 cl0ck5
    this.ctx.clear_tmr();

    //record stop time 
    this.end_date_time = date_time();
    this.t1 = window.performance.now(); 

    var txt = this.txt;
    var suc_txt = null; 
    var suc = this.successor;
    
    if(suc!=null && suc.txt !=null){
      suc_txt = suc.txt;
    }
    // enter next state
    if(this.successor!=null){
      this.ctx.set_state(this.successor);
      this.ctx.get_state().start();
    }
    
    // now that this `event' is ending, 
    // 1) record our data to the global csv-line record.
    // 2) proceed to the next state.
  };

  // print out the data for the object.. 
  this.data = function(){
    // duration in state (ms): not more than one decimal place
    var dt = Math.round(10. * (this.t1 - this.t0)) / 10.;   
    var dt_0 = parse_date_time(this.start_date_time);
    var dt_1 = parse_date_time(this.end_date_time);
    
    // csv record
    p = function(s){ return s.toString() +','; };
    s = trim( p(dt) + p(dt_0) + dt_1.toString() );
    //console.log(s);
    return(s); 
  };

  // descriptive csv header (mls: milliseconds-- three digits)
  this.fields = function(){
    return 't(mS),start(yyyy:mm:dd:hh:mn:ss:mls),end(yyyy:mm:dd:hh:mn:ss:mls)';
  };
  return this;
}

/* 
- collect any key presses. 
- record data to global record..
- reset keymap... 
- random selection: extra feedback on subsample of trials?  
*/

