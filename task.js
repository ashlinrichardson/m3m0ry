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


/* instructions task (show a slide with a message on it) `one trial'..  */ 
function instructions(txt, ctx){
  var x = new state(ctx);
  x.txt = txt;
  x.set_expiry(0); // no timer
  return x;
};
/* 

study phase, formerly known as orientation task

    multiple `trials' / events occur here... 
      based on a random selection... 

  (for the test phase, the random selection is shuffled back into the pool).. 

*/
function study_phase(my_pool, ctx){  
  this.ctx = ctx;
  this.p = my_pool;
  for(var i  in my_pool.selection){
    var x = new state(ctx);
    x.set_expiry(0);
    //x.txt = 'image'+i.toString();
    var data = my_pool.selection[i];
    //console.log(i,'pool',my_pool.selection[i]);
    if( typeof(data) === 'object'){
      //console.log('\timage');
      x.img_stim = data;    
    }else if(typeof(data) ==='string'){
      //console.log('\tstring');
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

/* 

test phase, formerly known as recognition task

for this phase, the random selection is shuffled back into the pool..

all elements from the pool are shown (feedback is recorded).. 

 */
function test_phase(my_pool, ctx){
  // deja vu vs. not deja-vu.... (this has more stuff in it..) 
  this.ctx = ctx;
  this.p = my_pool;


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

