/*
  Event hierarchy:
    1) Experiment (includes multiple tasks)
    2) Task (includes multiple trials)
    3) Trial (each task includes multiple basic events) 
*/

// instructions task (show a slide with a message on it) `one trial'.. 
function instructions(txt){
  // initialize generic `trial' object
  var x = new state();

  // set the associated text field
  x.txt = txt;

  // no timer for the trial
  x.set_expiry(0);

  x.type = 'instructions';
  return x;
};

/* 
study phase, formerly known as orientation task

    multiple `trials' / events occur here.. random selection of inputs... 

  (for the test phase, the random selection is shuffled back into the pool).. 

*/
function study_phase(my_pool){  
  // record references to graphics context, and stimulus pool
  this.ctx = ctx;
  this.p = my_pool;
  var trial_index = -1;
  // iterate over the `selected' elements of the pool.
  for(var i  in my_pool.selection){
    trial_index++;

    // initialize a generic `trial' object for each trial case..
    var x = new state();

    // need to add the timed parameter to the front-end API.. 
    x.set_expiry(0);

    // the data (word or image) is assigned to the `trial'.. 
    var data = my_pool.selection[i];
    
    // discriminate by image or word, respectively..
    if( typeof(data) === 'object'){
      x.img_stim = data;    
    }else if(typeof(data) ==='string'){
      x.wrd_stim = data
    }  

    x.type = 'study_phase';
    x.trial_id = trial_index;

  }
  // dummy iteration over remaining stimuli that weren't selected at first..(for future reference)..
  for(var i  in my_pool.stimuli){ 
    if( typeof(my_pool.selection[i]) === 'object'){
    }else if(typeof(my_pool.selection[i]) ==='undefined'){
    }
  }
  return this;
};

/* 
test phase, formerly known as recognition task
- for this phase, the random selection is shuffled back into the pool..
- all elements from the pool are shown (feedback is recorded).. 

 */
function test_phase(my_pool){
  // deja vu vs. not deja-vu.... (this has more stuff in it..) 
  this.p = my_pool;
  //reshuffle the events..
  var trial_index = -1;

  var shuffled_data = my_pool.reshuffle();
  var shuffled = shuffled_data[0];
  var deja_vu = shuffled_data[1];
  for(var i in shuffled){
    trial_index++;
    var x = new state(); 
    x.set_expiry(0);
    x.key_required=true;
    var data = shuffled[i];
    var deja = deja_vu[i];
    // record within the object whether we have deja-vu or not.. 
    x.deja = deja; 
    //x.txt2 = 'please press m or n';//if you saw the word/ image before (else n)';
    // discriminate by image or word, respectively..
    if( typeof(data) === 'object'){
      x.img_stim = data;    
    }else if(typeof(data) ==='string'){
      x.wrd_stim = data
    }  
    x.type = 'test_phase';
    x.trial_id = trial_index;   
  }
  return this;
};

/* formerly known as feedback task */
function response_task(){ 


};

function delay_task(txt){
  // list as many countries as possible during a 3-minute period.

  //response_task subsumes this...?
    var thirty_seconds = 30000; // time [mS]
    var x = new state(); 
    x.txt2 = 'bottom text?';
    x.txt = txt;//'top text';
    x.set_expiry(thirty_seconds);
    x.key_expiry =false;

    x.type = 'delay';
    x.trial_id = 0;
    return this;
};

