/* API use example: recognition memory experiment set-up. in future, will wrap the functions so the words `new' and `ctx' won't be needed.  */

var my_experiment = function(ctx){
  //set up some instruction slides..
  new instructions('welcome to the recognition memory experiment framework', ctx);
  new instructions('this is an instructions slide',                          ctx); 
  new instructions('this is another instructions slide',                     ctx); 
  new instructions('study phase coming next:',                               ctx);
  new instructions('please remember each word/image and press any key',      ctx);

  // set up a stimulus pool
  var p = new pool(ctx);
  
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
  new instructions('test phase coming up', ctx);
  new instructions('when you see an image/word, please press m or n', ctx);
  new instructions('please press m if you saw an image/word before', ctx);
  new instructions('please press n if you did not see the image/word before', ctx);
 
  // set up `test phase' (user input recorded for whole randomized pool)
  new test_phase(p, ctx);

  // by message
  new instructions('thanks you finished the test', ctx);  

}


