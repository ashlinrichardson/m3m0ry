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

function stimuli_pool(ctx){
};

function test(){
  console.log('test []');
  var x = new state(ctx);
}

