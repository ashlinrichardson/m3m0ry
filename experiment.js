/* 
    API usage example for recognition memory experiment    
*/

var my_experiment = function(ctx){

  //set up some instruction slides..
  new instructions('welcome to the recognition memory experiment framework', ctx);
  new instructions('this is an instructions slide',                          ctx); 
  new instructions('this is another instructions slide',                     ctx); 
  new instructions('study phase coming next:',                               ctx);
  new instructions('please remember each word/image and press any key',      ctx);

  // set up a stimulus pool
  var p = new pool();
  
  // add images to stimulus pool
  for(var i=0; i<10; i++){
    p.add(ctx.imgs[i]);
  }

  // add words to stimulus pool 
  p.add('another word stimulus');
  p.add('supercalifragilisticexpialidocious');
  p.add('umdiddlediddlediddleumdiddlei');

  // select portion of items from stimulus pool
  p.draw(5);
  
  // set up `study phase': show selected portions of pool
  new study_phase(p, ctx);  

  // some instructions before `test phase'
  new instructions('test phase is coming up', ctx);
  new instructions('when you see an image/word, please press m or n', ctx);

  // set up `test phase' (user input recorded for whole randomized pool)
  new test_phase(p, ctx);
  
}

