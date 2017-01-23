function instructions(txt, ctx){
  console.log('instructions ['+txt+']');
  var x = new state(ctx);
  x.set_txt(txt);
  x.txt = txt;
  x.set_expiry(0); // no timer
  return x;
};

function test(){
  console.log('test []');
  var x = new state(ctx);
}

