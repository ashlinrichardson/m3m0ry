/* get date and time */
function date_time(){
  return new Date()
}

/* load image data */
function load_img(fn){
  var img = new Image()
  img.src = fn 
  return img
}

/* seed for rand() below */
var seed = 5

/*random-number generator http://indiegamr.com/generate-repeatable-random-numbers-in-js/ : initial seed.. in order to work 'Math.seed' must NOT be undefined, so in any case, you HAVE to provide a Math.seed */
function rand(max, min) {
  max = max || 1
  min = min || 0
  seed = (seed * 9301 + 49297) % 233280
  var rnd = seed / 233280
  return min + rnd * (max - min)
}

/* pad to length n (with 0's on the left) */
function pad_n(x, n){
  var s = parseInt(trim(x)).toString(), m = s.length, d = n - m
  if(d > 0){
    s += '0'.repeat(d)
  }
  return s
}

/* via stackoverflow.com/users/4321/jw */
function get_keys(dictionary){

  /* keys recursive */
  var keys = []
  
  /* filter for direct ancestors */
  for(var key in dictionary){
    if(dictionary.hasOwnProperty(key)){
      keys.push(key)
    }
  }
  return keys
}

/* draw an image */
function draw_img(x, ctx){
    var cf = 4 * ctx.font_size, h = ctx.h() - cf, w = ctx.w(), lw = x.width, lh = x.height, sf = Math.min(w, h) / Math.max(lw, lh), a = (w - lw * sf) / 2, b = (h - lh * sf) / 2, c = lw * sf, d = lh * sf, df =  (-20 + cf / 2)
    ctx.drawImage(x, a, b + df, c, d)
}

/* write the above to a standardized format */
function parse_date_time(today){

  /* most significant units first */
  var bits = [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds()]

  /* pad with zeros */
  for(var i = 0; i < bits.length; i++){
    var n_pad = 2
    if(i==0) n_pad = 4
    if(i== 6) n_pad = 3
    var bts = bits[i].toString()
    bits[i] = pad_n(bts, n_pad)
  }
  return(bits.join(':'))
}

/* "faster trim" via blog.stevenlevithan.com */
function trim(s){
  return s.toString().replace(/^\s\s*/,'').replace(/\s\s*$/,'')
}

/* send text format data (string s) via XML to receive script at url (string): xml-receive_script_url  */
function xml_send(s, xml-receive_script_url){

  /* xml http request object */
  var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP")
  var data = new FormData()
  data.append("data", s)
  xhr.open( 'post', xml-receive_script_url, true)
  xhr.send(data)
}


