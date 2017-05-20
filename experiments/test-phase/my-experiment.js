/* recognition memory experiment set-up */
var my_experiment = function(){

  /* set up some instruction slides */
  instructions('study phase: please remember images and press any key (please press any key to continue)')

  /* set up a stimulus pool */
  var p = stimulus_pool()

  /* add images to stimulus pool */
  p.add_image(10)

  /* add words to stimulus pool */ 
  p.add('floccinaucinihilipilification')
  p.add('supercalifragilisticexpialidocious')
  p.add('umdiddlediddlediddleumdiddlei')

  /* selection from stimulus pool (parameters are N, M) */
  p.select(5, 5)

  /* set up `study phase': show selected portions of pool */
  study_phase(p, 111)

  /* some instructions before `test phase' */
  instructions('test phase coming up (please press any key to continue)')
  instructions('when you see an image/word, please press m or n (please press any key to continue)')
  instructions('please press m if you saw an image/word before (please press any key to continue)')
  instructions('please press n if you did not see the image/word before (please press any key to continue)')
 
  /* set up `test phase' (user input recorded for whole randomized pool) */
  test_phase(p, 333)
}
