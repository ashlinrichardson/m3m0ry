/* wrap text around a window region.. */
function wrap_text(s, ctx = document.getElementsByTagName("canvas")[0].getContext("2d"), start_y=0){
  // with help from ashblue
  var myX = 10; 
  var myY = 50;
  var line = ''; 
  var lines = []; 
  var fontSize = 30; 
  var lineTest = '';
  var w = canvas.width;
  var words = s.split(" ");
  ctx.font = fontSize +"px Arial";
  for(var j=0; j<words.length; j++){
    lineTest = line + words[j] + ' ';
    if(ctx.measureText(lineTest).width > w){
      myY = lines.length * fontSize + fontSize;
      lines.push({text: line, height: myY});
      line = words[j] + ' ';
    }else
      line = lineTest;
  }
  // catch last line if something left over
  if (line.length > 0) {
    currentY = lines.length * fontSize + fontSize;
    lines.push({text: line.trim(), height: currentY});
  }
  // visually output text
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for(var j = 0, len = lines.length; j < len; j++){
    ctx.fillText(lines[j].text, 0, lines[j].height + start_y);
  }
}

