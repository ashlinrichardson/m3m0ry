// get date and time 
function date_time(){
  return new Date();
}

// load image data 
function load_img(fn){
  var img = new Image(); 
  img.src = fn; 
  return img;
}

// random-number generator
var x = .5; 
function rand(){
  x = x / Math.sin(1 / x);
  x = Math.ceil(x) - x;
  return(x);
}

// pad to length n (with 0's on the left) 
function pad_n(x, n){
  // ensure string repr of number
  var s = parseInt(trim(x)).toString(); 
  var m = s.length;   
  var d = n - m;
  if(d > 0) 
    s += '0'.repeat(d);
  return s;
}

// by stackoverflow.com/users/4321/jw  
function get_keys(dictionary){
  var keys = []; // keys are recursive

  // filter for direct ancestors
  for(var key in dictionary){
    if(dictionary.hasOwnProperty(key))
      keys.push(key);
  }
  return keys;
}

/* draw an image */
function draw_img(x, ctx){
    var cf = 4 * ctx.font_size;
    var h = ctx.h() - cf;
    var w = ctx.w(); 
    var lw = x.width; 
    var lh = x.height;
    var sf = Math.min(w, h) / Math.max(lw, lh);
    var a = (w - lw * sf) / 2;  
    var b = (h - lh * sf) / 2;
    var c = lw * sf; 
    var d = lh * sf;
    ctx.drawImage(x, a, b + (cf / 2), c, d);
}

// write the above to a standardized format
function parse_date_time(today){

  // most significant units first
  var bits = [today.getFullYear(), 
              today.getMonth()+1, 
              today.getDate(), 
              today.getHours(), 
              today.getMinutes(), 
              today.getSeconds(), 
              today.getMilliseconds()]; 

  // pad with zeros
  for(var i = 0; i<bits.length; i++){
    var n_pad = 2;
    if(i==0) n_pad = 4;
    if(i== 6) n_pad = 3;
    var bts = bits[i].toString();
    bits[i] = pad_n(bts, n_pad);
  }
  return(bits.join(':'));
}

// `faster trim' by blog.stevenlevithan.com
function trim(s){
  return s.toString().replace(/^\s\s*/,'').replace(/\s\s*$/,'');
}

