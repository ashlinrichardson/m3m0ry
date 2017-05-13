/* recognition memory experiment set-up */
var my_experiment = function(){

  /* instruction slide */
  instructions('first delay phase (5 seconds): please press any key to start')

  /* set up delay task: 5 seconds */
  delay_task('please type names of as many countries as you can think of in 5 seconds, separated by spaces...press any key to begin',
             5000 /* 5000 mS */)

  /* instruction slide */
  instructions('second delay phase (10 seconds): please press any key to start')

  /* set up delay task: 10 seconds */
  delay_task('please type names of as many countries as you can think of in 10 seconds, separated by spaces...press any key to begin',
             10000 /* 10000 mS */)

  /* instruction slide */
  instructions('all done.. thank you.. please press any key to finish..')
}
