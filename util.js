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
  var yyyy = today.getFullYear();
  var   mm = today.getMonth()+1; //January is 0!
  var   dd = today.getDate();
  var   hh = today.getHours();
  var   mn = today.getMinutes();
  var   ss = today.getSeconds();
  var   ms = today.getMilliseconds();

  // make sure the right number of places..
      yyyy = pad_n(yyyy.toString(),  4);
        mm = pad_n(mm.toString(),    2);
        dd = pad_n(dd.toString(),    2);
        hh = pad_n(hh.toString(),    2);
        mn = pad_n(mn.toString(),    2);
        ss = pad_n(ss.toString(),    2);
        ms = pad_n(ms.toString(),    3);
  c = ":";
  return(yyyy + c + mm + c + dd + c + hh + c + mn + c + ss + c + ms);  
}
