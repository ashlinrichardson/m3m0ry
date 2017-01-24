/*
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
*/

function instructions(txt, ctx){
  console.log('instructions ['+txt+']');
  var x = new state(ctx);
  x.set_txt(txt);
  x.txt = txt;
  x.set_expiry(0); // no timer
  return x;
};

/* formerly known as orientation task*/
function study_phase(ctx){
};

/* formerly known as recognition task */
function test_phase(ctx){
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

// object that has words or images added to it. 
// need a separate render routine for the words... 
// also need to implement the shuffling routine.. 
function stimuli_pool(ctx){
  
};

function test(){
  console.log('test []');
  var x = new state(ctx);
}

