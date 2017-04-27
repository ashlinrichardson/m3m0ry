/* wrap text around a window region-- via ashblue */
function wrap_text(s, ctx, start_y=0){
  var myX = 10, myY = 50, line = '', lines = [], w = ctx.w(), h = ctx.h(), line_test = '', words = s.split(' '), font_size = ctx.font_size
  ctx.font = font_size +'px Arial'
  
  /* place words one by one */
  for(var j = 0; j < words.length; j++){
    line_test = line + words[j] + ' '   
    
    /* wrap if over the edge */
    if(ctx.measureText(line_test).width > w){
      myY = lines.length * font_size + font_size
      lines.push({text: line, height: myY})
      line = words[j] + ' '
    }else{
      line = line_test
    }
  }

  /* catch last line if something left over */
  if(line.length > 0){
    current_y = lines.length * font_size + font_size
    lines.push({text: line.trim(), height: current_y})
  }
   
  /* plot text */
  for(var j = 0, len = lines.length; j < len; j++){
    ctx.fillText(lines[j].text, 0, lines[j].height + start_y)
  }
}

function centre_text(s){
  var font_size = ctx.font_size, textString = s; 
  ctx.font = 30 +'px Arial'
  textWidth = ctx.measureText(textString ).width
  ctx.fillText(textString, (canvas.width/2) - (textWidth / 2), canvas.height/2)
}
