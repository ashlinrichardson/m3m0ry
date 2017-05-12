/* recognition memory experiment set-up */

var my_experiment = function(){

  /* instruction slide */
  instructions('delay phase: please press any key to start')

  /* set up delay task: 5 seconds */
  delay_task('please type in the names of as many countries as you can think of in 5 seconds, separated by spaces...press any key to begin', 5000)

  /* set up delay task: 30 seconds */
  delay_task('please type in the names of as many countries as you can think of in 30 seconds, separated by spaces...press any key to begin', 30000)

  /* instruction slide */
  instructions('all done.. thank you')
}
