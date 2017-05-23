/* recognition memory experiment set-up */
var my_experiment = function(){
  
  /* instructions */
  instructions('study phase coming next: (please press any key to continue)')
  instructions('please remember each word/image shown\n\n\neach word/image is displayed for up to 5 seconds:\n\n\nif you are done with a particular word/image in less than 5 seconds, please press any key to advance to the next word/image\n\n\n(please press any key to continue)')

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
              5000  /* SET (optional) */ )
}
