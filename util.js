function date_time(){  // get date and time 
  return new Date()
}
function load_img(fn){  // load image data
  var img = new Image()
  img.src = fn 
  return img
}
var seed = 5  // random-number generator http://indiegamr.com/generate-repeatable-random-numbers-in-js/ : initial seed
// in order to work 'Math.seed' must NOT be undefined, so in any case, you HAVE to provide a Math.seed
function rand(max, min) {
  max = max || 1
  min = min || 0
  seed = (seed * 9301 + 49297) % 233280
  var rnd = seed / 233280
  return min + rnd * (max - min)
}
function pad_n(x, n){  // pad to length n (with 0's on the left)
  var s = parseInt(trim(x)).toString(), m = s.length, d = n - m
  if(d > 0){
    s += '0'.repeat(d)
  }
  return s
}
function get_keys(dictionary){  // via stackoverflow.com/users/4321/jw
  var keys = []  // keys recursive
  for(var key in dictionary){  // filter for direct ancestors
    if(dictionary.hasOwnProperty(key)){
      keys.push(key)
    }
  }
  return keys
}
function draw_img(x, ctx){  // draw an image
    var cf = 4 * ctx.font_size, h = ctx.h() - cf, w = ctx.w(), lw = x.width, lh = x.height, sf = Math.min(w, h) / Math.max(lw, lh), a = (w - lw * sf) / 2, b = (h - lh * sf) / 2, c = lw * sf, d = lh * sf, df =  (-20 + cf / 2)
    ctx.drawImage(x, a, b + df, c, d)
}
function parse_date_time(today){  // write the above to a standardized format
  var bits = [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds()]  // most significant units first
  for(var i = 0; i < bits.length; i++){  // pad with zeros
    var n_pad = 2
    if(i==0) n_pad = 4
    if(i== 6) n_pad = 3
    var bts = bits[i].toString()
    bits[i] = pad_n(bts, n_pad)
  }
  return(bits.join(':'))
}
function trim(s){  // `faster trim' by blog.stevenlevithan.com
  return s.toString().replace(/^\s\s*/,'').replace(/\s\s*$/,'')
}
