/* wrap text around a window region.. */
function wrap_text(s, ctx, start_y=0){
  // with help from ashblue
  var myX = 10; 
  var myY = 50;
  var line = ''; 
  var lines = []; 
  var font_size = 30; 
  var line_test = '';
  var w = canvas.width;
  var h = canvas.height;
  var words = s.split(" ");
  ctx.font = font_size +"px Arial";
  for(var j=0; j<words.length; j++){
    line_test = line + words[j] + ' ';
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
  // visually output text
  ctx.clearRect(0, 0, w, h);
  for(var j = 0, len = lines.length; j < len; j++){
    ctx.fillText(lines[j].text, 0, lines[j].height + start_y);
  }
}

