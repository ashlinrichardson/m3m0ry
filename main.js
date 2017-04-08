  abs_path = '../../'
  var history = [], canvas = document.getElementsByTagName("canvas")[0], ctx = canvas.getContext("2d")
  document.bgColor = "#FFFFFF" // background color
  ctx.pad = 20 // shape parameter
  ctx.font_size = 30 // font size
  var less = function(x){  // canvas dimensions manipulation
    return x - ctx.pad
  }
  ctx.w = function(){
    return less(window.innerWidth)
  }
  ctx.h = function(){
    return less(window.innerHeight)
  }  
  function resize(){  // canvas resize
    canvas.width = ctx.w() 
    canvas.height = ctx.h() 
  }
  ctx.symbol = load_img(abs_path + "logo/uvic_gray.png")  // load corporate logo
  ctx.draw_symbol = function(){    // algo to draw scaled corporate logo
    var s_f = 5, pad = this.pad, s = this.symbol, ww = window.innerWidth, wh = window.innerHeight, w = ww - pad, h = wh - pad, w_s = s.width, h_s = s.height, wf = (ww - pad) / (s_f * w_s), lwf = w_s * wf, lhf = h_s * wf 
    this.drawImage(s, w - lwf, h - lhf, lwf, lhf)
  }
  ctx.set_state = function(s){  // access current `state' (a state is an individual `trial')
    last_state = null;
    if(ctx.current_state != null){
      last_state = ctx.current_state
    }
    ctx.current_state = s 
    if(s != null){  // no!! not true!!!:::  
      s.daddy = last_state
    }
    return(s)
  }
  ctx.get_state = function(){  // access current `state' (a state is an individual `trial')
    var s = ctx.current_state
    var st = ''
    try{
      st = s.txt
    }catch(e){
      st = ''
    }
    return s 
  }
  window.onresize = function(event){  // trigger updating/plotting on window resize event..
    update()
  } 
  function update(){  // update the canvas (present the current `trial')
    resize() 
    var now = ctx.get_state()
    if(now != null) 
      now.show(ctx)
  }
  window.onload = function(){  // `in' hook..
    update()
  }
  ctx.egg_timer = egg_timer  // set up the timer to coordinate transition between trial
  ctx.clear_tmr = function(){
    ctx.egg_timer.cancel() 
  }
  ctx.init_tmr = function(t_ms){
    ctx.egg_timer.setup(t_ms)
  }
  ctx.last_new_state = null  // initialize reference to first and most-recently-initialized trials..
  ctx.first_new_state = null
  ctx.questions_correct = 0  // count the amount of questions correct (redundant as can be calculated from `the data')
  ctx.questions_total = 0
  var n_imgs = 200;// 10 //200;  // load some image files (n.b., to use more images, increase n_imgs)
  ctx.load_imgs = function (n_imgs){
    var imgs = new Array() // should only load the ones that are used..
    for(var i=1; i <= n_imgs; i++){
      console.log('load img', i)
      imgs.push(load_img(abs_path + 'images/' + i + '.jpg'))
    }
    ctx.imgs = imgs
    return ctx.imgs
  }
  var my_images = ctx.load_imgs(10)
  my_experiment(ctx)  // set up an experiment according to user specs/code
  ctx.last_state = ctx.last_new_state
  ctx.set_state(ctx.first_new_state)  // start at the very beginning, it's a very good place to start..
  key_unicode = keyboard_module()  // process keyboard events:
  ctx.t0 = window.performance.now() 
  ctx.get_state().start()
