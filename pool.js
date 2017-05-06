/* stimulus pool - object that has words or images added to it. Selections drawn randomly for "study phase" by draw() method. That selection is shuffled back into the deck, for the "test phase" */
var next_pool_id = 0
function pool(){
  this.pool_id = next_pool_id
  next_pool_id += 1
  console.log("pool id" + this.pool_id.toString())
  this.ctx = ctx
  this.stimuli = new Array()
  this.add = function(stim){
    this.stimuli.push(stim)
    return stim
  }

  /* pseudorandom selection of size "m" */
  this.draw = function(m){
    if(this.selection){
      console.log('error: selection already made from this pool.')
      return null
    }
    var n = parseInt(m)
    if(n > this.stimuli.length){
      console.log('error: n > this.stimuli.length')
      return null
    }
    this.selection = new Array()
    var rem = this.stimuli.length
    for(var i = 0; i < n; i++){ 
      var qx = rand() * parseFloat(rem), idx = parseInt(qx)
      rem -= 1
      this.selection.push(this.stimuli[idx])
      delete this.stimuli[idx]
      this.stimuli = this.stimuli.filter(function(){return true})
    }
  }

  /* when initializing a test phase: mix selection back in with other stimuli */
  this.reshuffle = function(){
    var to_shuffle = []
    for(var i=0; i<this.selection.length; i++){
      var dat_i = new Array()
      dat_i.push(this.selection[i])
      dat_i.push(true)
      to_shuffle.push(dat_i)
    }      
    for(var i=0; i<this.stimuli.length; i++){  
      var dat_i = new Array()
      dat_i.push(this.stimuli[i])
      dat_i.push(false)
      to_shuffle.push(dat_i)
    } 
    var shuffled = new Array(), deja_vu = new Array(), rem =to_shuffle.length
    while(rem >0){
      rem -= 1
      var idx = parseInt(rand() * parseFloat(rem)), dat_i = to_shuffle[idx]
      shuffled.push(dat_i[0])
      deja_vu.push(dat_i[1])
      delete to_shuffle[idx]
      to_shuffle = to_shuffle.filter(function(){return true})
    }
    var ret = [shuffled, deja_vu]
    return ret
  }
  return this
}
