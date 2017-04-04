// sl33p function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// cr34t3 a c4nv4s wh3r3 th3 m4g1c h4pp3ns
var canvas = document.createElement('canvas')
document.body.appendChild(canvas)
var js_added = 0
deps = []

// j4v4scr1pt 4n4l0g 0f 1nclud3 st4t3m3nt
function add_js(fn){
  var body = document.getElementsByTagName('body')[0]
  var s = document.createElement('script')
  s.async = false
  s.src = fn + '.js'
  var callback = function(){
    js_added += 1  
    if(js_added < deps.length){
      add_js(deps[js_added])
    }
  }
  s.onload=callback // need to do this to make sure we wait until script loaded.
  var len = body.childNodes.length
  body.appendChild(s)
}

// c4ll 4ll th3 ch1ldr3n
dependencies = ['text', 'key', 'util', 'task', 'pool', 'state', 'egg_timer']
for(var d in dependencies){
  deps.push('../../' + dependencies[d])
}
deps.push('my_experiment')
deps.push('../../main')
add_js(deps[0], '')

