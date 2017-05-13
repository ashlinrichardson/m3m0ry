/* recognition memory experiment set-up */
var my_experiment = function(){
  
  /* instructions */
  instructions('study phase coming next:')
  instructions('please remember each word/image and press any key')

  /* set up a stimulus pool */
  var p = stimulus_pool()
  
  /* add images to stimulus pool */  
  for(var i = 0; i < 10; i++){
    p.add(ctx.imgs[i])
  }

  /* add words to stimulus pool */ 
  p.add('floccinaucinihilipilification')
  p.add('supercalifragilisticexpialidocious')
  p.add('umdiddlediddlediddleumdiddlei')

  /* select portion of items from stimulus pool */
  p.select(2, 2)

  /* set up `study phase': show selected portions of pool */
  study_phase(p,  /* stimulus pool */  
              111 /* ISI (optional) */, 
              3000  /* SET (optional) */ )
}
