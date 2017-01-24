// record data to global record..
// reset keymap... 
// random selection: extra feedback on subsample of trials.  
  
/* generic object representing task or trial.. */ 
function state( ctx,                 // meta4 graphics context
                expiry_ms  =     0,    // max. presentation time (mS)     
                key_expiry =  true, // expiry by key-press (true <--> on)
                intvl_ms   =     0,    // interval btwn stimuli.. (ISI) `blank slide'
                img_idx    =    -1,     //image data (if any)
                txt    =    null,      //text data (if any)
                daddy = null, // parent object... 
                successor = null //child 
                //txt2_idx ? how many possible messages?
              ){ 
  // leaves (trials) default to parent params? should be equal anyways.
  this.ctx = ctx; // reference to graphics context  
  this.intvl_ms = intvl_ms; //only applies if there's a `next' trial.. (if this is a trial).
  this.expiry_ms = expiry_ms; // numeric 
  this.key_expiry = key_expiry; // boolean
  this.img_idx = img_idx; // global image index (images added as member of ctx).
  //plottext, logo, and possible answers, collect any key presses.
  this.successor = null;  
  this.daddy = daddy; // super-ordinate state

  // where are we going?
  this.set_successor = function(s){
    this.successor=s;
  };

  // pl0t t3xt 0r 1mag3s 
  this.show = function(){
    // 1) draw upper text.
    if(this.txt)
      wrap_text(this.txt, this.ctx, 0);

    // 2) img or middle text (if word stim)
    var x = ctx.imgs[4]; // what is the data here?
    draw_img(x, ctx);
  
    // 3) bottom text
    if(this.txt2)
      wrap_text(this.txt2, this.ctx, this.ctx.h() - 2* this.ctx.font_size);


    // 4) logo if no image/ lower text present (add conditional)..
    ctx.draw_symbol(); // need this line?
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

  // 3nt3r 4 5t4t3
  this.start = function(){
    // st4rt th3 cl0ck
    this.t0 = window.performance.now(); 
    this.start_date_time = date_time(); 
    this.ctx.clear_tmr(); // cl34r th3 t1m3r
    this.show(this.ctx);
    
    // maybe start timer 
    if(this.expiry_ms > 0)
      ctx.init_tmr(this.expiry_ms, this.expire);
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
    
    if(suc!=null && suc.txt !=null)
      suc_txt = suc.txt;
    
    if(this.successor!=null){
      // enter next state
      this.ctx.set_state(this.successor);
      this.ctx.get_state().start();
    }
    
    // now that this `event' is ending, 
    // 1) record our data to the global csv-line record.
    // 2) proceed to the next state.
  };

  /* print out the data for the object.. */
  this.data = function(){
    // duration in state (ms): not more than one decimal place
    var dt = Math.round(10. * (this.t1 - this.t0)) / 10.;   
    var dt_0 = parse_date_time(this.start_date_time);
    var dt_1 = parse_date_time(this.end_date_time);
    
    // csv record
    p = function(s){ return s.toString() +','; };
    s = trim( p(dt) + p(dt_0) + dt_1.toString() );
    console.log(s);
    return(s); 
  };

  this.fields = function(){
    // descriptive csv header (mls: milliseconds-- three digits)
    return 't(mS),start(yyyy:mm:dd:hh:mn:ss:mls),end(yyyy:mm:dd:hh:mn:ss:mls)';
  };
  return this;


}


