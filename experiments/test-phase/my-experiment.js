/* recognition memory experiment set-up */
var my_experiment = function(){

  /* set up some instruction slides */
  instructions('study phase: please remember images and press any key')

  /* set up a stimulus pool */
  var p = stimulus_pool()

  /* add images to stimulus pool */
  for(var i = 0; i < 10; i++){
    p.add(get_image())
  }

  /* add words to stimulus pool */ 
  p.add('floccinaucinihilipilification')
  p.add('supercalifragilisticexpialidocious')
  p.add('umdiddlediddlediddleumdiddlei')

  /* selection from stimulus pool (parameters are N, M) */
  p.select(3, 3)

  /* set up `study phase': show selected portions of pool */
  study_phase(p, 111)

  /* some instructions before `test phase' */
  instructions('test phase coming up')
  instructions('when you see an image/word, please press m or n')
  instructions('please press m if you saw an image/word before')
  instructions('please press n if you did not see the image/word before')
 
  /* set up `test phase' (user input recorded for whole randomized pool) */
  test_phase(p, 333)
}
