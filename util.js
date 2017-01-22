/* `faster trim' by blog.stevenlevithan.com */ 
function trim(str){
  s = str.toString();
  return s.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

/* by http://stackoverflow.com/users/4321/jw  */
function get_keys(dictionary){
  var keys = [];
  // key in dictionary is recursive.
  for(var key in dictionary){
    // filter for direct ancestors.
    if(dictionary.hasOwnProperty(key)) {
      keys.push(key);
    }
  }
  return keys;
}

/* display an error message */
function error(m){
  console.log('Error: ' + trim(m.toString()));
}

/* pad a number/string to length n (with 0's on the left) */
function pad_n(x, n){
  s = parseInt(trim(x)).toString(); // ensure string.
  m = s.length;   // how many characters?
  var d = n - m;
  if(d < 0){
    console.log('Error: number.toString() larger than expected.');
  }else if(d > 0){
    // left-pad with d-instances of '0'
    for(var i = 0; i < d; i++){
      s = '0' + s;
    }
  }else{
    // done : - ) 
  }
  return s;
}

/* get mS-accurate date and time */
function date_time(){
  return new Date();
}

/* write the above to a standardized format.. */
function parse_date_time(today){
 
  // jan is 0
  var bits = [ 
    today.getFullYear(), 
    today.getMonth()+1,
    today.getDate(), 
    today.getHours(), 
    today.getMinutes(), 
    today.getSeconds(), 
    today.getMilliseconds()
  ];
    
  // pad with zeros
  for(var i = 0; i<bits.length; i++){
    var n_pad = 2;
    if(i==0) n_pad = 4;
    if(i== 6) n_pad = 3;
    bits[i] = pad_n(bits[i].toString(), n_pad)
  }

  return(bits.join(':'));
}
