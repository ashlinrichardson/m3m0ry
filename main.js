  abs_path = '../../';

  var history = []; 

  // graphics ctx
  var canvas = document.getElementsByTagName("canvas")[0];
  var ctx = canvas.getContext("2d"); 
  
  // aesthetic parameters  
  document.bgColor = "#FFFFFF"; // background color
  ctx.pad = 20; // shape parameter
  ctx.font_size = 30; // font size
  
  // canvas dimensions manipulation
  var less = function(x){ return x - ctx.pad; }
  ctx.w = function(){ return less(window.innerWidth); }
  ctx.h = function(){ return less(window.innerHeight); }  
  // canvas resize
  function resize(){ 
    canvas.width = ctx.w(); 
    canvas.height = ctx.h(); 
  };

  // load corporate logo
  ctx.symbol = load_img(abs_path + "logo/uvic_gray.png");

  // algorithm to draw scaled corporate logo
  ctx.draw_symbol = function(){
    var s_f = 5;
    var pad = this.pad;
    var s = this.symbol;
    var ww = window.innerWidth; 
    var wh = window.innerHeight;
    var w = ww - pad; var h = wh - pad; 
    var w_s = s.width; var h_s = s.height;
    var wf = (ww - pad) / (s_f * w_s);
    var lwf = w_s * wf; var lhf = h_s * wf; 
    this.drawImage(s, w - lwf, h - lhf, lwf, lhf);
  };

  // access current `state' (a state is an individual `trial')
  ctx.set_state = function(s){
    last_state = null;
    if(ctx.current_state != null)
      last_state = ctx.current_state;
    ctx.current_state = s; 
    if(s != null){
      // no!! not true!!!:::  
      s.daddy = last_state;
    }
    return(s);
  };

  // access current `state' (a state is an individual `trial')
  ctx.get_state = function(){
    var s = ctx.current_state;
    var st = '';
    try{
      st=s.txt;
    }catch(e){
      st='';
    }
    return s 
  };

  // trigger updating/plotting on window resize event..
  window.onresize = function(event){ 
    update(); 
  }; 

  // update the canvas (present the current `trial')
  function update(){ 
    resize(); 
    var now = ctx.get_state();
    if(now!=null) 
      now.show(ctx);
  };
  
  // seems to be the `in' hook..
  window.onload = function(){
    //set up all the events in a chain... 
    update();
  };

  // set up the timer to coordinate transition between trials
  ctx.egg_timer = egg_timer;
  ctx.clear_tmr = function(){
    ctx.egg_timer.cancel(); 
  };
  ctx.init_tmr = function(t_ms, callback){ 
    ctx.egg_timer.setup(t_ms, callback);
  };
      
  // initialize reference to first and most-recently-initialized trials..
  ctx.last_new_state = null;
  ctx.first_new_state = null;

  // count the amount of questions correct (redundant as can be calculated from `the data')
  ctx.questions_correct = 0;
  ctx.questions_total = 0;


  // load some image files (n.b., to use more images, increase n_imgs)
  var n_imgs = 10; //200;
  ctx.load_imgs = function (n_imgs){
    var imgs = new Array(); 
    // should only load the used ones..
    for(var i=1; i <= n_imgs; i++){
      imgs.push(load_img(abs_path + 'images/' + i + '.jpg'));
    }
    ctx.imgs = imgs;
    return ctx.imgs;
  };
  var my_images = ctx.load_imgs(10);
  
  // set up an experiment according to user specfications/code
  my_experiment(ctx);
  
  ctx.last_state = ctx.last_new_state;
  console.log('start');
  // start at the very beginning, it's a very good place to start..
  ctx.set_state(ctx.first_new_state);
  ctx.get_state().start();
//------------------------------------------------

  // process keyboard events. 
  key_unicode = keyboard_module();
  ctx.t0 = window.performance.now(); 

