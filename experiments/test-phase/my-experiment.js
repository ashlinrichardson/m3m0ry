/* recognition memory experiment set-up */
var my_experiment = function(){

  /* set up some instruction slides */
  instructions('study phase: please remember words/images and,\n\n\n\t* please press any key to advance to the next word/image\n\n\n(please press any key to continue)')

  /* set up a stimulus pool */
  var p = stimulus_pool()

  /* add 10 available images to stimulus pool */
  p.add_image(10)

  /* add words to stimulus pool */ 
  p.add('floccinaucinihilipilification')
  p.add('supercalifragilisticexpialidocious')
  p.add('umdiddlediddlediddleumdiddlei')

  /* selection from stimulus pool: parameters are N, M as per the requirements */
  p.select(5, 5)

  /* set up `study phase': show selected portions of pool */
  study_phase(p, 111 /* ISI of 111 mS */ )

  /* some instructions before `test phase' */
  instructions('test phase coming up:\n\n\nwhen you see an image/word, please press m or n:\n\n\n\t* please press m if you saw an image/word before\n\n\n\t* please press n if you did not see the image/word before\n\n\n(please press any key to continue)')
 
  /* set up `test phase' (user input recorded for whole randomized pool) */
  test_phase(p, 333 /* ISI of 333 mS */ )
}
