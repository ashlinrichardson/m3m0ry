/* get date and time */
function date_time(){
  return new Date();
}

/* load image data */
function load_img(fn){
  var img = new Image(); 
  img.src = fn; 
  return img;
}

/* display an error message */
function error(m){
  console.log('Error: ' + trim(m.toString()));
}

/* pad to length n (with 0's on the left) */
function pad_n(x, n){
  // ensure string repr of number
  var s = parseInt(trim(x)).toString(); 
  var m = s.length;   
  var d = n - m;
  if(d > 0) 
    s += '0'.repeat(d);
  return s;
}

/* by stackoverflow.com/users/4321/jw  */
function get_keys(dictionary){
  var keys = [];
  // keys are recursive
  for(var key in dictionary){
    // filter for direct ancestors
    if(dictionary.hasOwnProperty(key))
      keys.push(key);
  }
  return keys;
}

/* write the above to a standardized format.. */
function parse_date_time(today){
 
  // jan is 0
  var bits = [ 
    today.getFullYear(), today.getMonth()+1, today.getDate(), 
    today.getHours(), today.getMinutes(), today.getSeconds(), 
    today.getMilliseconds()];
    
  // pad with zeros
  for(var i = 0; i<bits.length; i++){
    var n_pad = 2;
    if(i==0) n_pad = 4;
    if(i== 6) n_pad = 3;
    bits[i] = pad_n(bits[i].toString(), n_pad)
  }

  return(bits.join(':'));
}

/* `faster trim' by blog.stevenlevithan.com */ 
function trim(s){
  return s.toString().replace(/^\s\s*/,'').replace(/\s\s*$/,'');
}

