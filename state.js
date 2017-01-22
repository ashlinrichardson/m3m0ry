/* 
//20170120:0538
               expiry-- CHECK
               keypress --- 
               link states

               -- record data to global record..
               -- plot i) image ii) text.  
               -- now need to string events together and watch them roll : - )
               -- pass to next in chain. : - ) 
    
//20170120:04:30-- now implement the types of events (and the 3 possible things that can happen). 
a state has two types of expiry:
  - interval (`stimulus exposure time' limits an event..) 
  - key press.. 


  Event hierarchy:
    1) Experiment (includes multiple tasks)
    2) Task (includes multiple trials)
    3) Trial (each task includes multiple basic events) 

    Types of Task:
    1) Instructions Task (really just a 1-trial thing... except needs to be placed properly).
    2) Response Task (display instructions once, then...?)
    3) Delay Task (name as many cities as you can... or display a video!!).
    4) Orientation task
    5) Recognition task (shares a stimulus pool with the latter..) 
    
  Don't forget to let the keymap get reset! that will go later.... 
  
*/

/* stimulus pool */
function pool(ctx){
  this.stimuli = Array();
  this.add = function(stim){
    this.stimuli.push(stim);
  }
  return this;
}

/* generic object representing task or trial.. */ 
function state( ctx,                 // meta4 graphics context
                idx        =    -1,   // global object id
                kind       =    -1,   // object type
                expiry_ms  =     0,    // max. presentation time (mS)     
                key_expiry =  true, // expiry by key-press (true <--> on)
                intvl_ms   =     0,    // interval btwn stimuli.. (ISI) `blank slide'
                img_idx    =    -1,     //image data (if any)
                txt_idx    =    -1,      //text data (if any)
                daddy = null // parent object...
                //txt2_idx ? how many possible messages?
              ){ 
  // leaves (trials) default to parent params? should be equal anyways.
  this.ctx = ctx; // reference to graphics context
  this.idx = idx;  // global id for this object
  this.kind = kind; // type of this object..
  this.intvl_ms = intvl_ms; //only applies if there's a `next' trial.. (if this is a trial).
  this.expiry_ms = expiry_ms; // numeric 
  this.key_expiry = key_expiry; // boolean
  this.img_idx = img_idx; // global image index (images added as member of ctx).
  //plot the text, logo, and possible answers, and collect any key presses.
  this.awake = true;
  
  var this_state = this;

  this.show = function(){
    var ctx = this.ctx;
    ctx.draw_symbol();
  };
  this.get_ctx = function(){
    return this.ctx;
  }

  this.set_expiry = function(t_ms){
    // follow clock or key to keep the show going
    this.expiry_ms = t_ms;
    if(t_ms <= 0){
      this.key_expiry = true;
    }
  }

  this.start = function(){
    this.ctx.clear_tmr();
    this.t0 = window.performance.now(); // record a start time.
    this.start_date_time = date_time();
    // start `slide' expiry timer : - )
    if(this.expiry_ms > 0){
      // there's no time like the present
      var now = this.ctx.get_state();  
      var expiry = this.expiry_ms;
      ctx.init_tmr(expiry, now, now.expire);
    }
    return null;
    //if `expiry' > 0 (mS) set a timer-interrupt, too!
    // force no timers open. add at ctx.tmr ?
  };
  
  // should there only be one (end + expire) function?
  this.end = function(){  
    this.awake = false;
    this.ctx.clear_tmr();
    this.t1 = window.performance.now(); //record a stop time.
    this.end_date_time = date_time();
    console.log('end');
    // now that this `event' is ending, 
    // 1) record our data to the global csv-line record.
    // 2) proceed to the next state.
    return null;
  };

  // function gets called if the state is active for exiry_ms
  this.expire = function(){ // egg is cooked. 
    console.log('expire');
    //close barn door even if the horse is gone  
    //end(); return (this.key_expiry == true);
    // record data and proceed to next state.
    if(this.key_expiry == true){
      end();
      return true;
    }else{
      return false;
    }
  };

  /* print out the data for the object.. */
  this.data = function(){
    var t0 = this.t0; var start_dt = this.start_date_time;
    var t1 = this.t1; var end_dt = this.end_date_time;
    var dt = t1-t0; // duration in state: record <=1 decimal place.
    dt = Math.round(10. * dt) / 10.;   
    var dt_0 = parse_date_time(start_dt);
    var dt_1 = parse_date_time(end_dt);
    p = function(s){ return s.toString() +','; };
    s = trim( p(dt) + p(dt_0) + dt_1.toString() );
    console.log(s);
    return(s); 
  };

  this.field_names = function(){
    return 't(mS),start(yyyy:mm:dd:hh:mn:ss:mls),end(yyyy:mm:dd:hh:mn:ss:mls)';
  };



 return this;
}

/* load image data */
function load_image(fn){
  var img = new Image(); 
  img.src = fn; 
  return img;
}

// random selection: extra feedback on subsample of trials. 

