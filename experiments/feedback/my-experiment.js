/* recognition memory experiment set-up */
var my_experiment = function(){

  /* instructions */
  instructions('feedback coming up... please press any key...')
    
  /* feedback "task" */
  feedback('please enter your affinity with the last stimulus on a scale of 1-5', [49, 50, 51, 52, 53])

  /* instructions */
  instructions('thank you... more feedback coming up... please press any key...')

  /* more feedback "task" */
  feedback('please enter your affinity with the last stimulus on a scale of 0-9', [49, 50, 51, 52, 53, 54, 55, 56, 57, 48])

  
  /* instructions */
  instructions('thank you... multiple choice style feedback coming up... please press any key...')

  /* feedback "task" */
  feedback('skill testing question: 10*10 is: a) 100 b) 200 c) 1000 d) 10000', [65, 66, 67, 68])

  /* instructions */
  instructions('thank you.. please press any key to finish')
}
