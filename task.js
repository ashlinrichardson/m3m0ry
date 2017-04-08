/* Event hierarchy: 1) Experiment (includes multiple tasks)
  2) Task (includes multiple trials)
  3) Trial (each task includes multiple basic events) */
function instructions(txt){  // instructions task (show a slide with a message on it) `one trial'..
  var x = new state()  // initialize generic `trial' object
  x.txt = txt  // set the associated text field
  x.set_expiry(0)  // no timer for the trial
  x.type = 'instructions'
  return x
}
/* study phase, formerly known as orientation task
  multiple `trials' / events occur here.. random selection of inputs... 
  (for the test phase, the random selection is shuffled back into the pool).. */
function study_phase(my_pool){  // record references to graphics context, and stimulus pool
  this.ctx = ctx
  this.p = my_pool
  var trial_index = -1
  for(var i  in my_pool.selection){  // iterate over the `selected' elements of the pool
    trial_index ++
    var x = new state()  // initialize generic `trial' object for each trial case..    
    x.set_expiry(0)  // need to add timed parameter to front-end API..
    var data = my_pool.selection[i]  // the data (word or image) assigned to 'trial'..
    if( typeof(data) === 'object'){  // discriminate by image or word, resp..
      x.img_stim = data   
    }else if(typeof(data) === 'string'){
      x.wrd_stim = data
    }  
    x.type = 'study_phase'
    x.trial_id = trial_index
  }
  for(var i  in my_pool.stimuli){  // dummy iteration over remaining stimuli that weren't selected at first..(for future reference).. 
    if( typeof(my_pool.selection[i]) === 'object'){
    }else if(typeof(my_pool.selection[i]) === 'undefined'){
    }
  }
  return this
}
/* test phase, formerly known as recognition task
- for this phase, the random selection is shuffled back into the pool..
- all elements from the pool are shown (feedback is recorded).. */
function test_phase(my_pool){  // deja vu vs. not deja-vu.... (this has more stuff in it..) 
  this.p = my_pool
  var trial_index = -1, shuffled_data = my_pool.reshuffle(), shuffled = shuffled_data[0], deja_vu = shuffled_data[1]
  for(var i in shuffled){
    trial_index ++
    var x = new state()
    x.set_expiry(0)
    x.key_required = true
    var data = shuffled[i], deja = deja_vu[i]
    x.deja = deja  // record within the object whether we have deja-vu or not..
    if( typeof(data) === 'object'){  // discriminate by image or word, resp..
      x.img_stim = data    
    }else if(typeof(data) ==='string'){
      x.wrd_stim = data
    }  
    x.type = 'test_phase'
    x.trial_id = trial_index   
  }
  var end = instructions('thank you for completing this section')
  end.action = function(me){
    var msg ='Your score: ' + ctx.questions_correct.toString() + '/' + ctx.questions_total.toString()
    me.txt = msg
  }
  return this
}
function feedback(txt, keys){  // formerly known as feedback task
  var x = new state()
  x.set_expiry(0)
  x.txt = txt
  x.key_required = true
  x.clear_admissible_keys()
  for(var i in keys){
    console.log(i, keys[i])
    x.add_admissible_key(keys[i])
  }
}
function delay_task(txt, delay_time){  // list as many countries as possible during e.g., 3-minute period
  var y = instructions(txt)
  y.key_expiry = true
  y.set_expiry(500)
  y.hold_on()  //keypress activated with minimum time....
  var thirty_seconds = 30000, x = new state()  // time [mS]
  x.set_expiry(delay_time)
  x.key_expiry = false
  x.txt = '' 
  x.type = 'delay'
  x.trial_id = 0
  return this;
}
