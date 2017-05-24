/* recognition memory experiment set-up */
var my_experiment = function(){

  instructions('first delay phase coming up (please press any key to continue)')

  delay_task('please write out anything that comes to mind (please press <esc> key when finished)')

  /* instruction slide */
  instructions('second delay phase (5 seconds): (please press any key to continue)')

  /* set up delay task: 5 seconds */
  delay_task('please type names of as many countries as you can think of in 5 seconds, separated by spaces.. (please press any key to continue)',
             5000 /* 5000 mS */)

  /* instruction slide */
  /* instruction slide -- fixed duration */
  var x = instructions('thank you for completing the delay task: test phase coming up in 5 seconds..')
  x.set_expiry(5000)
  x.key_expiry = false

  instructions('third delay phase (6 seconds): (please press any key to continue)')

  /* set up delay task: 6 seconds */
  delay_task('please type names of as many countries as you can think of in 6 seconds, separated by spaces.. (please press any key to continue)',
             6000 /* 10000 mS */)

  /* instruction slide */
  instructions('all done.. thank you.. (please press any key to continue)')
}
