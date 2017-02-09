var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
  
function add_js(fn){
    var e = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type','text/javascript');
    s.setAttribute('src',fn+'.js');
    e.appendChild(s);
  }
dependencies = ['text', 'key', 'util', 'task', 'pool', 'state', 'egg_timer', 'experiment'];
for(var d in dependencies){
  add_js(dependencies[d]);
}

add_js('main')

