// cr34t3 a c4nv4s wh3r3 th3 m4g1c h4pp3ns
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
  
// j4v4scr1pt 4n4l0g 0f 1nclud3 st4t3m3nt
function add_js(fn){
    var e = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src','../../'+fn+'.js');
    e.appendChild(s);
  }

// c4ll 4ll th3 ch1ldr3n
dependencies = ['text', 'key', 'util', 'task', 'pool', 'state', 'egg_timer'];
for(var d in dependencies){
  add_js(dependencies[d]);
}

// c4ll d4ddy
add_js('main')

