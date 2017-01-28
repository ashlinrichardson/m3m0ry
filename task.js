/*
  Event hierarchy:
    1) Experiment (includes multiple tasks)
    2) Task (includes multiple trials)
    3) Trial (each task includes multiple basic events) 

    Types of Task:
    2) Response Task (display instructions once, then...?)
    3) Delay Task (name as many cities as you can... or display a video!!).
    5) Recognition task (shares a stimulus pool with the latter..) 
*/


// object that has words or images added to it. 
// need a separate render routine for the words... 
// also need to implement the shuffling routine.. 
/* stimulus pool */
function pool(){//ctx){
  this.ctx = ctx;
  this.stimuli = new Array();
  this.add = function(stim){
    this.stimuli.push(stim);
    return stim;
  };
  // draw a selection of size 'm'
  this.draw = function(m){
    if(this.selection){
      console.log('error: selection already made from this pool.');
      return null;
    }
    var n = parseInt(m);
    if(n > this.stimuli.length){
      console.log('error: n > this.stimuli.length');
      return null;
    }
    this.selection = new Array();
    var rem = this.stimuli.length;
    for(var i = 0; i < n; i++){ 
      var qx = rand()*parseFloat(rem); //this.stimuli.length);
      rem -= 1;
      var idx = parseInt(qx);
      console.log(rem, '=rem,','idx '+ idx.toString()+','+qx.toString(), this.stimuli[idx], this.stimuli);
      this.selection.push(this.stimuli[idx]);

      // deleting doesn't empty (strange..).. it cuts out, but it leaves a hole..:P
      delete this.stimuli[idx];
      // remove empty elements.. 
      this.stimuli = this.stimuli.filter(function() { return true; });

    }
      };
  return this;
};

function instructions(txt, ctx){
  var x = new state(ctx);
  x.txt = txt;
  x.set_expiry(0); // no timer
  return x;
};

/* formerly known as orientation task*/
function study_phase(my_pool, ctx){  
  this.ctx = ctx;
  this.p = my_pool;
  for(var i  in my_pool.selection){
    var x = new state(ctx);
    x.set_expiry(0);
    //x.txt = 'image'+i.toString();
    var data = my_pool.selection[i];
    console.log(i,'pool',my_pool.selection[i]);
    if( typeof(data) === 'object'){
      console.log('\timage');
      x.img_stim = data;    
    }else if(typeof(data) ==='string'){
      console.log('\tstring');
      x.wrd_stim = data
    }  
  }
  for(var i  in my_pool.stimuli){ // remaining stimuli that weren't selected at first..
    //console.log('stim',my_pool.stimuli[i], typeof(i));
    if( typeof(my_pool.selection[i]) === 'object'){
      //console.log('\timage');
    }else if(typeof(my_pool.selection[i]) ==='undefined'){
      //console.log('\tstring');
    }
  }
  return this;
};

/* formerly known as recognition task */
function test_phase(ctx, my_study_phase){
  // deja vu vs. not deja-vu.... (this has more stuff in it..) 
  this.p = my_study_phase.p; // same pool as study phase. now extra stuff is mixed in...
  return this;
};

/* formerly known as feedback task */
function response_task(ctx){ 
  // there might be a mode where this functionality has to mix with test-phase. 

  // block these out by trial first... 
};

function delay_task(ctx){
  // list as many countries as possible during a 3-minute period.
  // play a video. 
};

