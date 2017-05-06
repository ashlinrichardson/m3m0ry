/* Event hierarchy: 1) Experiment (includes multiple tasks) 2) Task (includes multiple trials) 3) Trial (each task includes multiple basic events) */

/* instructions task (show a slide with a message on it) */
function instructions(txt){
  var my_task_id = next_task_id++
  
  /* initialize generic "trial" object */
  var x = new state()
  
  /* set associated text field */
  x.txt = txt
  
  /* no timer for the trial */  
  x.set_expiry(0)
  x.type = 'instructions'
  x.task_id = my_task_id
  x.trial_id = 0 
  return x
}

/* study phase, formerly known as orientation task: multiple `trials' / events occur here.. random selection of inputs... (for the test phase, the random selection is shuffled back into the pool).. */
function study_phase(my_pool){
  var my_task_id = next_task_id++
  
  /* record references to graphics context, and stimulus pool */
  this.ctx = ctx
  this.p = my_pool
  var trial_index = -1

  /* iterate over selected elements of pool */
  for(var i  in my_pool.selection){
    trial_index ++

    /* initialize generic "trial" object for each case */
    var x = new state()
    
    /* need to add timed parameter to front-end API */
    x.set_expiry(0)

    /* data (word or image) assigned to "trial" */
    var data = my_pool.selection[i]
    
    /* discern by image or word, respectively */
    if( typeof(data) === 'object'){
      x.img_stim = data   
    }else if(typeof(data) === 'string'){
      x.wrd_stim = data
    }  
    x.type = 'study_phase'
    x.trial_id = trial_index
    x.task_id = my_task_id
  }
  
  /* dummy iteration over remaining stimuli that weren't selected at first, for future reference */
  for(var i  in my_pool.stimuli){
    if( typeof(my_pool.selection[i]) === 'object'){
    }else if(typeof(my_pool.selection[i]) === 'undefined'){
    }
  }
  return this
}

/* test phase, formerly known as recognition task - for this phase, the random selection is shuffled back into the pool -- all elements from the pool are shown (feedback is recorded).. */
function test_phase(my_pool){
  var my_task_id = next_task_id++

  this.p = my_pool
  var trial_index = -1, shuffled_data = my_pool.reshuffle(), shuffled = shuffled_data[0], deja_vu = shuffled_data[1]
  for(var i in shuffled){
    trial_index ++
    var x = new state()
    x.set_expiry(0)
    x.key_required = true
    var data = shuffled[i], deja = deja_vu[i]

    /* record within the object: do we have deja-vu? */    
    x.deja = deja
    
    /* word or image? */
    if( typeof(data) === 'object'){
      x.img_stim = data    
    }else if(typeof(data) ==='string'){
      x.wrd_stim = data
    }  
    x.type = 'test_phase'
    x.trial_id = trial_index
    x.task_id = my_task_id 
  }
  var m = 'thank you for completing this section'
  var end = instructions(m)
  
  end.action = function(me){
    var msg = m + 'Your score: ' + ctx.questions_correct.toString() + '/' + ctx.questions_total.toString() + ". Please press any key."
    me.txt = msg
  }
  return this
}

/* previously known as feedback task */
function feedback(txt, keys){
  var my_task_id = next_task_id++

  var x = new state()
  x.set_expiry(0)
  x.txt = txt
  x.key_required = true
  x.clear_admissible_keys()
  for(var i in keys){
    console.log(i, keys[i])
    x.add_admissible_key(keys[i])
  }
  x.task_id = my_task_id
}

/* list as many countries as possible during e.g., a 3-minute period */
function delay_task(txt, delay_time){
  var my_task_id = next_task_id++

  var y = instructions(txt)
  y.key_expiry = true
  y.set_expiry(500)

  /* keypress activated with minimum time */
  y.hold_on()

  /* time [mS] */
  var thirty_seconds = 30000, x = new state()
  x.set_expiry(delay_time)
  x.key_expiry = false
  x.txt = '' 
  x.type = 'delay'
  x.trial_id = 0
  x.task_id = my_task_id
  return this;
}
