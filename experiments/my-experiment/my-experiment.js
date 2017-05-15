/* recognition memory experiment set-up: customized/ complex experiment */
var my_experiment = function(){

  /* set up some instruction slides */
  instructions('study phase: please remember words/images and press any key')

  /* set up a stimulus pool */
  var p1 = stimulus_pool()

  /* add images to stimulus pool */
  for(var i = 65; i < 70; i++){
    p1.add(ctx.imgs[i])
  }

  /* set up a stimulus pool */
  var p2 = stimulus_pool()

  /* add images to stimulus pool */
  for(var i = 100; i < 105; i++){
    p2.add(ctx.imgs[i])
  }

  /* add words to stimulus pool */ 
  p1.add('floccinaucinihilipilification')
  p1.add('supercalifragilisticexpialidocious')
  p1.add('equanimity')
  
  /* add words to second stimulus pool */
  p2.add('compassion')
  p2.add('dogovarivatsya')
  p2.add('umdiddlediddlediddleumdiddlei')

  /* selection from stimulus pool (parameters are N, M) */
  p1.select(3, 3)
  p2.select(3, 3)

  /* need to bundle the two pools together, into an array */
  var two_pools = [p1, p2]

  /* set up `study phase': show selected portions of pool */
  study_phase(two_pools, 
              111, /* ISI */
              4500 /* SET */ )

  /* some instructions before `test phase' */
  instructions('test phase coming up')
  instructions('when you see an image/word, please press m or n')
  instructions('please press m if you saw an image/word before')
  instructions('please press n if you did not see the image/word before')
 
  /* set up `test phase' (user input recorded for whole randomized pool) */
  test_phase(two_pools, /* stimulus pools */
             1000, /* ISI */
             4500, /* SET */
             4, /* extra feedback (one for every 3 slides, approx.) */
             "Did you like the last picture? A=yes, B=no, C=maybe, D=not sure", /* message for extra feedback */
             [65, 66, 67, 68] /* accepted keypresses for extra feedback */ )
}
