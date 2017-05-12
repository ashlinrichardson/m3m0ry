/* recognition memory experiment set-up */
var my_experiment = function(){

  /* set up some instruction slides */
  instructions('study phase: please remember images and press any key')

  /* set up a stimulus pool */
  var p1 = stimulus_pool()

  /* add images to stimulus pool */
  for(var i = 0; i < 10; i++){
    p1.add(ctx.imgs[i])
  }

  /* set up a stimulus pool */
  var p2 = stimulus_pool()

  /* add images to stimulus pool */
  for(var i = 10; i < 20; i++){
    p2.add(ctx.imgs[i])
  }

  /* add words to stimulus pool */ 
  p1.add('floccinaucinihilipilification')
  p1.add('supercalifragilisticexpialidocious')
  p1.add('umdiddlediddlediddleumdiddlei')

  /* add words to second stimulus pool */
  p2.add('compassion')
  p2.add('equanimity')
  p2.add('dogovarivatsya')

  /* selection from stimulus pool (parameters are N, M) */
  console.log('p1.select()')
  p1.select(3, 3)
  console.log('p2.select()')
  p2.select(3, 3)
  console.log('two pools')

  /* need to bundle the two pools together, into an array */
  var two_pools = [p1, p2]

  /* set up `study phase': show selected portions of pool */
  study_phase(two_pools, 111)

  /* some instructions before `test phase' */
  instructions('test phase coming up')
  instructions('when you see an image/word, please press m or n')
  instructions('please press m if you saw an image/word before')
  instructions('please press n if you did not see the image/word before')
 
  /* set up `test phase' (user input recorded for whole randomized pool) */
  test_phase(two_pools, 333)
}
