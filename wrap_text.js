// wrap text around a window region
function wrap_text(s, ctx, start_y=0){ 
  // based on code by ashblue
  var myX = 10; 
  var myY = 50;
  var line = ''; 
  var lines = []; 
  var w = ctx.w();
  var h = ctx.h();
  var line_test = '';
  var words = s.split(' ');
  var font_size = ctx.font_size; 
  ctx.font = font_size +'px Arial';

  // place words one by one  
  for(var j = 0; j < words.length; j++){
    line_test = line + words[j] + ' ';
    // wrap if we go over the edge
    if(ctx.measureText(line_test).width > w){
      myY = lines.length * font_size + font_size;
      lines.push({text: line, height: myY});
      line = words[j] + ' ';
    }else
      line = line_test;
  }
  // catch last line if something left over
  if (line.length > 0) {
    current_y = lines.length * font_size + font_size;
    lines.push({text: line.trim(), height: current_y});
  }
  //plot the text 
  for(var j = 0, len = lines.length; j < len; j++){
    ctx.fillText(lines[j].text, 0, lines[j].height + start_y);
  }
}

