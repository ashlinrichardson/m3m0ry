/* recognition memory experiment set-up. */

var my_experiment = function(){
  //set up some instruction slides..

  instructions('delay phase: please press any key to start')

  delay_task('please type in the names of as many countries as you can think of in 5 seconds, separated by spaces...press any key to begin'
    ,5000)

  delay_task('please type in the names of as many countries as you can think of in 30 seconds, separated by spaces...press any key to begin'
    ,30000)

instructions('all done.. thank you')
  

}
