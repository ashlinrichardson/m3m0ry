abs_path = '../../'
var history = [], canvas = document.getElementsByTagName("canvas")[0], ctx = canvas.getContext("2d")

/* background color */
document.bgColor = "#FFFFFF"

/* shape parameter */
ctx.pad = 20

/* font size */
ctx.font_size = 30

/* canvas dimensions manipulation */
var less = function(x){
  return x - ctx.pad
}

ctx.w = function(){
  return less(window.innerWidth)
}

ctx.h = function(){
  return less(window.innerHeight)
}

/* canvas resize */
function resize(){
  canvas.width = ctx.w()
  canvas.height = ctx.h()
}

/* load corporate logo */
ctx.symbol = load_img(abs_path + "logo/uvic_gray.png")

/* algo to draw scaled corporate logo */
ctx.draw_symbol = function(){
  var s_f = 5, pad = this.pad, s = this.symbol
  var ww = window.innerWidth, wh = window.innerHeight
  var w = ww - pad, h = wh - pad, w_s = s.width, h_s = s.height
  var wf = (ww - pad) / (s_f * w_s), lwf = w_s * wf, lhf = h_s * wf
  this.drawImage(s, w - lwf, h - lhf, lwf, lhf)
}

/* access current "state" (a state represents a particular "trial" in an experiment) */
ctx.set_state = function(s){
  last_state = null;
  if(ctx.current_state != null){
    last_state = ctx.current_state
  }
  ctx.current_state = s

  /* should not happen.. */
  if(s != null){
    s.daddy = last_state
  }
  return(s)
}

/* access present "state" */
ctx.get_state = function(){
  var s = ctx.current_state
  var st = ''
  try{
    st = s.txt
  }catch(e){
    st = ''
  }
  return s
}

/* trigger update/plotting from window resize event */
window.onresize = function(event){
  update()
}

/* update the canvas (present the current "trial") */
function update(){
  resize()
  var now = ctx.get_state()
  if(now != null)
    now.show(ctx)
}

/* "in" hook: plot the current trial */
window.onload = function(){
  update()
}

/* set up timer to coordinate transitions between trials */
ctx.egg_timer = egg_timer

ctx.clear_tmr = function(){
  ctx.egg_timer.cancel()
}

ctx.init_tmr = function(t_ms){
  ctx.egg_timer.setup(t_ms)
}

/* initialize reference to first and most-recently-initialized trials */
ctx.last_new_state = null
ctx.first_new_state = null

/* count number of questions answered correctly (this is redundant) */
ctx.questions_correct = 0
ctx.questions_total = 0

/* this function sets up the experiment (according to the user function my_experiment)
and we trigger this function after all the images have loaded. */
function run_after_loading_images(){

  /* set up an experiment according to user specs/code */
  my_experiment(ctx)
  
  /* in this part, we should record only the images that we actually need */
  
  instructions('thank you')
  
  ctx.last_state = ctx.last_new_state
  ctx.first_state = ctx.first_new_state
  
  /* start at the very beginning, it's a very good place to start.. */
  ctx.set_state(ctx.first_state)
  
  /* respond to keyboard events */
  key_unicode = keyboard_module()
  
  /* start "stopwatch" */
  ctx.t0 = window.performance.now()

  /* go */
  ctx.get_state().start()
}

/* load some image files: need to change if the image database changes */
var n_imgs = 200
var n_imgs_loaded = 0

/* load image data */
function load_img(fn){
  var img = new Image()
  img.onload = function(){
    /* console.log('loaded image: ', fn) */
    n_imgs_loaded += 1
    if(n_imgs_loaded == n_imgs){

      /* proceed to init the experiment, after all images loaded.. */
      run_after_loading_images()
    }
  } 
  /* load the image */
  img.src = fn 
  return img
}


/* load all of the image data */
ctx.load_imgs = function(n_imgs){

  /* ideally would only load the ones used */
  var imgs = new Array()
  for(var i=1; i <= n_imgs; i++){
    var img_fn = abs_path + 'images/' + i + '.jpg'
    var my_img = load_img(img_fn)
    my_img.fn = 'images/' + i + '.jpg'
    imgs.push(my_img)
  }
  ctx.imgs = imgs
  return ctx.imgs
}

var my_images = ctx.load_imgs(n_imgs)
var next_task_id = 0;



