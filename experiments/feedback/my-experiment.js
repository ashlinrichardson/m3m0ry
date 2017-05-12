/* recognition memory experiment set-up */

var my_experiment = function(){

  /* instructions */
  instructions('feedback coming up...')
    
  /* feedback "task" */
  feedback('please enter your affinity with the last stimulus on a scale of 1-5', [49, 50, 51, 52, 53])

  /* instructions */
  instructions('thank you... more feedback coming up...')

  /* more feedback "task" */
  feedback('please enter your affinity with the last stimulus on a scale of 0-9', [49, 50, 51, 52, 53, 54, 55, 56, 57, 48])

  /* instructions */
  instructions('thank you')
}
