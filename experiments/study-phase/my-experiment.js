/* recognition memory experiment set-up */
var my_experiment = function(){
  
  /* instructions */
  instructions('study phase coming next: (please press any key to continue)')
  instructions('please remember each word/image and press any key (please press any key to continue)')

  /* set up a stimulus pool */
  var p = stimulus_pool()
  
  /* add images to stimulus pool */ 
  p.add_image(10)

  /* add words to stimulus pool */ 
  p.add('floccinaucinihilipilification')
  p.add('supercalifragilisticexpialidocious')
  p.add('umdiddlediddlediddleumdiddlei')

  /* select portion of items from stimulus pool */
  p.select(5)

  /* set up `study phase': show selected portions of pool */
  study_phase(p,  /* stimulus pool */  
              111 /* ISI (optional) */, 
              4500  /* SET (optional) */ )
}
