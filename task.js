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
  x.type = 'instructions', x.task_id = my_task_id, x.trial_id = 0 
  return x
}

/* study phase, formerly known as orientation task: multiple `trials' / events occur here.. random selection of inputs... (for the test phase, the random selection is shuffled back into the pool).. */
function study_phase(my_pool, isi=0, time_limit=0, extra_feedback=false, extra_feedback_message="", extra_feedback_keys=[]){

  /* the above constructor (same with test_phase) can accept either a single stimulus pool (pool()),
    or an array of stimulus pools (pool()) */
  var my_pools = []
  if(my_pool.is_pool){
    my_pools.push(my_pool)
  }else{
    my_pools = my_pool
  }

  var trial_index = -1, my_task_id = next_task_id++
  this.ctx = ctx, this.p = my_pools, this.pool_ids = new Array()
  
  /* for study phase, selection is built from combination of all selection_n arrays, from each of the supplied pools */
  var my_selection = new Array()
  for(var a_pool in my_pools){
    var my_pool = my_pools[a_pool]
    this.pool_ids.push(my_pool.pool_id)
    for(var i  in my_pool.selection_n){
      var extra_feedback_this_slide = false
      if(extra_feedback != false){
        if(0 == i % parseInt(extra_feedback)){
          extra_feedback_this_slide = true
        }
      }
      my_selection.push([my_pool.selection_n[i], my_pool.pool_id, extra_feedback_this_slide])
    }
  }

  /* randomize the order of the array */
  shuffle(my_selection, true)

  for(var selection_ind in my_selection){

    /* increment the trial-index counter */
    ++ trial_index

    var a_selection = my_selection[selection_ind]
    
    /* data (word or image) assigned to "trial" */
    var data = a_selection[0], p_id = a_selection[1], extra_feedback_this_slide = a_selection[2]
  
    /* if ISI was set, prefix with a "blank" slide */
    if(isi > 0){
      var x = new state()
      x.set_expiry(isi)
      x.type = 'isi', x.wrd_stim = "", x.trial_id = trial_index, x.task_id = my_task_id
      x.set_pool_id(my_pool.pool_id)
      x.clear_admissible_keys()
      x.key_expiry = false
    }
  
    /* initialize generic "trial" object for each case */
    var x = new state()
    if(time_limit <= 0){
      x.set_expiry(0)
      x.key_required = false
    }else{
      x.set_expiry(time_limit)
      x.key_required = false
    }

    /* discern by image or word, respectively */
    if( typeof(data) === 'object'){
      x.img_stim = data   
    }else if(typeof(data) === 'string'){
      x.wrd_stim = data
    }  
    x.type = 'study_phase', x.trial_id = trial_index, x.task_id = my_task_id
    x.set_pool_id(p_id)
    if(extra_feedback_this_slide){
      var x_f = feedback(extra_feedback_message, extra_feedback_keys)
    }
  }
  return this
}

/* test phase, formerly known as recognition task - for this phase,
the random selection is shuffled back into the pool -- all elements 
from the pool are shown (feedback is recorded).. */
function test_phase(my_pool, isi=0, time_limit=0, extra_feedback=false, extra_feedback_message="", extra_feedback_keys=[]){
  var my_pools = []
  if(my_pool.is_pool){
    my_pools.push(my_pool)
  }else{
    my_pools = my_pool
  }

  var trial_index = -1, my_task_id = next_task_id++
  this.ctx = ctx, this.p = my_pools, this.pool_ids = new Array()

  /* for test phase, selection is built from combination of all selection_m arrays, from each of the supplied pools */
  var my_selection = new Array()
  for(var a_pool in my_pools){
    var my_pool = my_pools[a_pool]
    this.pool_ids.push(my_pool.pool_id)
    var trial_index = -1, shuffled_data = my_pool.reshuffle(), shuffled = shuffled_data[0], deja_vu = shuffled_data[1]
    for(var i  in shuffled){
      var extra_feedback_this_slide = false
      if(extra_feedback != false){
        if(0 == i % parseInt(extra_feedback)){
          extra_feedback_this_slide = true
        }
      }
      my_selection.push([shuffled[i], my_pool.pool_id, deja_vu[i], extra_feedback_this_slide])
    }
  }
  shuffle(my_selection, true)

  for(var selection_ind in my_selection){
    ++ trial_index

    var a_selection = my_selection[selection_ind]
    var data = a_selection[0], p_id = a_selection[1], deja = a_selection[2], extra_feedback_this_slide = a_selection[3]

    /* if ISI was set, prefix with a "blank" slide */
    if(isi > 0){
      var x = new state()
      x.set_expiry(isi)
      x.type = 'isi', x.wrd_stim = "", x.trial_id = trial_index, x.task_id = my_task_id
      x.set_pool_id(p_id)
      x.clear_admissible_keys()
      x.key_expiry = false
    }

    var x = new state()
    x.key_required = true
    if(time_limit <= 0){
      x.set_expiry(0)
    }else{
      x.set_expiry(time_limit)
    }

    /* record within the object: do we have deja-vu? */    
    x.deja = deja

    /* word or image? */
    if( typeof(data) === 'object'){
      x.img_stim = data    
    }else if(typeof(data) ==='string'){
      x.wrd_stim = data
    }  
    x.type = 'test_phase', x.trial_id = trial_index, x.task_id = my_task_id 
    x.set_pool_id(p_id)

    if(extra_feedback_this_slide){
      var x_f = feedback(extra_feedback_message, extra_feedback_keys)
    }
  } 
  var m = 'Thank you for completing this section. ', end = instructions(m)
  
  end.action = function(me){
    var msg = m + 'Your score: ' + ctx.questions_correct.toString() + '/' + ctx.questions_total.toString() + ". Please press any key."
    me.txt = msg
  }
  return this
}

/* previously known as feedback task */
function feedback(txt, keys){
  var my_task_id = next_task_id ++

  var x = new state()
  x.set_expiry(0)
  x.txt = txt, x.key_required = true
  x.clear_admissible_keys()
  for(var i in keys){
    x.add_admissible_key(keys[i])
  }
  x.type = 'feedback', x.trial_id = 0, x.task_id = my_task_id
}

/* list as many countries as possible during e.g., a 3-minute period (default, 30s) 
  20170515: default for delay_time used to be 30000. Today we added the end on <esc>
  key feature
*/
function delay_task(txt, delay_time=0, isi_=500){
  var my_task_id = next_task_id ++, isi = parseInt(isi_)

  /* if ISI was set, prefix with a "blank" slide */
  if(isi > 0){
    var x = new state()
    x.set_expiry(isi)
    x.type = 'isi', x.wrd_stim = "", x.trial_id = 0, x.task_id = my_task_id
    x.clear_admissible_keys()
    x.key_expiry = false
  }

  var y = instructions(txt)

  if(true){
    /* time [mS] */
    var x = new state()
    x.set_expiry(delay_time)
    x.key_expiry = false, x.txt = '', x.type = 'delay', x.trial_id = 0, x.task_id = my_task_id
    if(delay_time <= 0){
      x.clear_admissible_keys()
      x.add_admissible_key(27)
      console.log('admissible_keys', x.admissible_keys)
    }
  }
  return this
}
