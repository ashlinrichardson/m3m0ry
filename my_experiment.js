/* recognition memory experiment set-up. */

var my_experiment = function(){
  //set up some instruction slides..
  instructions('welcome to the recognition memory experiment framework')
  instructions('this is an instructions slide')
  instructions('this is another instructions slide') 
  instructions('study phase coming next:')
  instructions('please remember each word/image and press any key')

  // set up a stimulus pool
  var p = pool()
  // add images to stimulus pool  
  for(var i=0; i<10; i++){
    p.add(ctx.imgs[i])
  }

  // add words to stimulus pool 
  p.add('floccinaucinihilipilification')
  p.add('supercalifragilisticexpialidocious')
  p.add('umdiddlediddlediddleumdiddlei')

  // select portion of items from stimulus pool
  p.draw(5)  

  // set up `study phase': show selected portions of pool
  study_phase(p)

  // some instructions before `test phase'
  instructions('test phase coming up')
  instructions('when you see an image/word, please press m or n')
  instructions('please press m if you saw an image/word before')
  instructions('please press n if you did not see the image/word before')
 
  // set up `test phase' (user input recorded for whole randomized pool)
  test_phase(p)

  // by message
  instructions('thank you for finishing the test')


  var p = pool()

}
