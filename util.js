/* cr34t3 a c4nv4s wh3r3 th3 m4g1c h4pp3ns */
var canvas = document.createElement('canvas')
document.body.appendChild(canvas)

/* image parameters: set defaults for default image library. These values will change if a survey/experiment specific image data folder is selected */
var n_imgs = 200, n_imgs_to_load = 0, n_imgs_loaded = 0
var abs_path = '../../'
var imgs_path = abs_path

var inet_path_qualified = function(scripts){

  /* from stackoverflow: fully qualified internet path of script */

  var scripts = document.getElementsByTagName('script'), script = scripts[scripts.length - 1]

  if(script.getAttribute.length !== undefined){
    return script.src
  }

  return script.getAttribute('src', -1)
}

var inet_path_source = function(){

  /* from stackoverflow: path as it appears relative to the source code */

  var scripts = document.getElementsByTagName('script'), script = scripts[scripts.length - 1]

  if(script.getAttribute.length !== undefined){
    return script.getAttribute('src')
  }

  return script.getAttribute('src', 2)
}

/* get date and time */
function date_time(){
  return new Date()
}

/* seed for rand() below */
var seed = 5

var get_seconds = function(){
  var d = new Date()

  /* return an epoch time (S) */
  return d.getMilliseconds()
}

var mutable_seed = get_seconds()

/*random-number generator http://indiegamr.com/generate-repeatable-random-numbers-in-js/ : initial seed.. in order to work 'Math.seed' must NOT be undefined, so in any case, you HAVE to provide a Math.seed */
function rand(max, min, mutable=false){
  max = max || 1, min = min || 0
  if(mutable){
    mutable_seed = (mutable_seed * 9301 + 49297) % 233280
    return min + (mutable_seed / 233280) * (max - min)
  }
  else{
    seed = (seed * 9301 + 49297) % 233280
    return min + (seed / 233280) * (max - min)
  }
}

/* Shuffle array in place, via http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
* @param {Array} a items The array containing the items. setting the parameter "mutable" to true,
makes random selections that will change between runs. */
function shuffle(a, mutable=false){
  var j, x, i
  for(i = a.length; i; i--){

    /* use our seeded random number generator, so we get the same results every time */
    j = Math.floor(rand(null, null, mutable) * (1. * i))
    x = a[i - 1]
    a[i - 1] = a[j]
    a[j] = x
  }
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
  var cf = 4 * ctx.font_size
  var h = ctx.h() - cf, w = ctx.w()
  var lw = x.width, lh = x.height
  var sf = Math.min(w, h) / Math.max(lw, lh)
  var a = (w - lw * sf) / 2, b = (h - lh * sf) / 2
  var c = lw * sf, d = lh * sf, df = (-20 + cf / 2)
  ctx.drawImage(x, a, b + df, c, d)
}

/* write the above to a standardized format */
function parse_date_time(today){

  /* most significant units first */
  var bits = [today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds()]

  /* pad with zeros */
  for(var i = 0; i < bits.length; i++){
    var n_pad = 2
    if(i == 0){
      n_pad = 4
    }
    if(i == 6){
      n_pad = 3
    }
    var bts = bits[i].toString()
    bits[i] = pad_n(bts, n_pad)
  }
  return(bits.join(':'))
}

/* "faster trim" via blog.stevenlevithan.com */
function trim(s){
  return s.toString().replace(/^\s\s*/,'').replace(/\s\s*$/,'')
}

/* split a string on delimiter (with default delimiter) */
function split(str, delim=null){
  str = str.toString()
  if(delim){
    return str.split(delim)
  }
  else{

    /* microsoft and unix newline compatible */
    return str.split('\n')
  }
}

/* init HTMLHttpRequest object */
function new_xhr(){

  /* IE7+, Firefox, Chrome, Opera, Safari vs. IE5, IE6 */
  return window.XMLHttpRequest ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP")
}

/* send text format data (string s) via XML to receive script at url (string): xml-receive_script_url */
function xml_send(s, xml_receive_script_url){

  /* xml http request object */
  var xhr = new_xhr()
  var data = new FormData()
  data.append("data", s)
  xhr.open('post', xml_receive_script_url, true)
  xhr.send(data)
}

/* given a string representative of the contents of an html-file, extract image file names from it */
function extract_filenames(str, base_url){

  /* array to hold the different file numbers available */
  var file_numbers = new Array()

  var my_split = split(str)
  for( var i in my_split){
    var line = trim(my_split[i])
    var words = split(line, ' ')

    if(words[0] == '<img'){
      var file_name = split(words[4], '"')[1]
      var fn_words = null;
      if(file_name){
        fn_words = split(file_name, '.')
      }

      if(fn_words && fn_words.length == 2){
        var num = fn_words[0]
        var ext = fn_words[1]
        if(ext != 'jpg'){
          // pass on, e.g., html file
        }
        else{
          console.log(line)
          num = parseInt(num)
          file_numbers.push(num)
        }
      }
    }
  }
  var compare = function(a, b){
    return a - b
  }

  file_numbers = file_numbers.sort(compare)
  var use_default_files = file_numbers.length < 1;

  if(file_numbers.length > 0){
    for(var i = 0; i < file_numbers.length; i++){
      if(i + 1 != file_numbers[i]){
        console.log('error: number was out of place or missing: ', i, file_numbers[i])
        use_default_files = true;
      }
    }
    if(use_default_files){
      n_imgs = 200
      imgs_path = abs_path
    }
    else{
      for(var i = 0; i < file_numbers.length; i++){
        file_numbers[i] = base_url + file_numbers[i].toString() + '.jpg'
      }
      n_imgs = file_numbers.length, imgs_path = base_url
    }
  }
  console.log("extract_filenames::file_numbers", file_numbers)
  return file_numbers
}

/* synchronous (blocking) wget : promises example: https://github.com/mdn/js-examples/blob/master/promises-test/index.html#L61 */
function wget_synchronous(url){
  return new Promise(function(resolve, reject){
    var xhr = new_xhr()
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status==200){
        resolve(xhr.responseText)
      }
      else{
        /* reject("error: wget failed") */
      }
    }
    xhr.open("GET", url, false)
    xhr.send()
  }
  );
}

/* given the asynchronous fetch of html-data, extract the file-names from the result */
function list_files(dir_name){
  return wget_synchronous(dir_name).then(
    function(response){
      file_numbers = extract_filenames(response.toString(), dir_name)
      console.log(file_numbers)
      return file_numbers
    }
    ,
    function(reject){
      console.log('rejected')
    } 
  );
}

/* get the html-data re: the experiment/study folder (for looking for images) */
function get_experiment_folder_html(){

  /* doesn't matter what file we run this from: same answer. */
  var loc = document.location

  /* check for expected filename/ path for html file */
  loc = loc.toString()
  if(loc.slice(-11) != 'memory.html'){
    console.log('error: unexpected filename: ' + loc)
  }

  /* drop the filename and return the path */
  var words = loc.split('/')
  return words.slice(0, words.length - 1).join('/') + '/'
}

list_files(get_experiment_folder_html())
