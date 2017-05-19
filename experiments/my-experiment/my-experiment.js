/* recognition memory experiment set-up: customized/ complex experiment */
var my_experiment = function(){

  /* set up some instruction slides */
  instructions('study phase: please remember words/images and press any key')

  /* set up a stimulus pool */
  var p1 = stimulus_pool()

  /* add images to stimulus pool */
  for(var i =0; i < 10; i++){
    p1.add(get_image())
  }

  /* add words to stimulus pool */ 
  p1.add('floccinaucinihilipilification')
  p1.add('supercalifragilisticexpialidocious')
  p1.add('equanimity')

  /* set up a stimulus pool */
  var p2 = stimulus_pool()

  /* add images to stimulus pool */
  for(var i = 0; i < 10; i++){
    p2.add(get_image())
  }
  
  /* add words to second stimulus pool */
  p2.add('compassion')
  p2.add('dogovarivatsya')
  p2.add('umdiddlediddlediddleumdiddlei')

  /* selection from stimulus pool (parameters are N, M) */
  p1.select(5, 5)
  p2.select(5, 5)

  /* need to bundle the two pools together, into an array */
  var two_pools = [p1, p2]

  /* set up `study phase': show selected portions of pool */
  study_phase(two_pools, 
              111, /* ISI */
              4500 /* SET */ )

  /* instruction slide */
  instructions('second delay phase (5 seconds): please press any key to start')

  /* set up delay task: 5 seconds */
  delay_task('please type names of as many countries as you can think of in 10 seconds, separated by spaces...press any key to begin',
             10000 /* 5000 mS */)

  /* instruction slide -- fixed duration */
  var x = instructions('thank you for completing the delay task: test phase coming up in 5 seconds..')
  x.set_expiry(5000)
  x.key_expiry = false

  /* some instructions before `test phase' */
  instructions('test phase coming up')
  instructions('when you see an image/word, please press m or n')
  instructions('please press m if you saw an image/word before')
  instructions('please press n if you did not see the image/word before')
 
  /* set up `test phase' (user input recorded for whole randomized pool) */
  test_phase(two_pools, /* stimulus pools */
             111, /* ISI */
             6000, /* SET */
             6, /* extra feedback (one for every 6 slides, approx.) */
             "How did you feel about the last stimulus? A=positive, B=negative, C=neutral, D=not sure", /* message for extra feedback */
             [65, 66, 67, 68] /* accepted keypresses for extra feedback */ )
}
