/* stimulus pool - object that has words or images added to it. Selections drawn randomly for "study phase" by draw() method. That selection is shuffled back into the deck, for the "test phase" */
var next_pool_id = 0
function pool(){
  this.is_pool = true
  this.pool_id = next_pool_id
  next_pool_id += 1
  console.log('pool, id=', this.pool_id)
  this.ctx = ctx
  this.stimuli = new Array()

  /* add a stimulus to the pool */
  this.add = function(stim){
    this.stimuli.push(stim)
    return stim
  }

  /* set number of samples for study phase */
  this.set_n = function(n){
    this.n = n
  }
  
  /* set number of additional samples to be included for test phase */
  this.set_m = function(m){

    /* subsequently to drawing "n" items from the pool (without replacement), an additional "m" samples are drawn from the pool. For the test phase, the "n" and "m" selections are mixed together and shuffled. */
    this.m = m
  }

  /* get */
  this.get_n = function(){
    return this.n
  }
  
  /* get */
  this.get_m = function(){
    return this.m
  }


  /* remove any "blank" elements (an operation needed due to an apparent curiosity of the language) that appeared from drawing elements without replacement */
  this.remove_blanks = function(){
    this.stimuli = this.stimuli.filter(function(){return true})
  }

  /* pseudorandom selection of size "n" */
  this.draw_n = function(){
    console.log('\tpool, id=', this.pool_id)

    if(this.selection_n){
      console.log('error: n-selection already made from this pool.')
      return null
    }
    var n = parseInt(this.get_n())
    if(n > this.stimuli.length){
      console.log('error: n > this.stimuli.length')
      return null
    }
    this.selection_n = new Array()
    var rem = this.stimuli.length
    for(var i = 0; i < n; i++){ 
      var qx = rand() * parseFloat(rem), idx = parseInt(qx)
      rem -= 1
      this.selection_n.push(this.stimuli[idx])
      delete this.stimuli[idx]
      this.remove_blanks()
    }
  }

  /* pseudorandom selection of size "m" */
  this.draw_m = function(){
    console.log('\tpool, id=', this.pool_id)

    if(this.selection_m){
      console.log('error: m-selection already made from this pool.')
      return null
    }
    var m = parseInt(this.get_m())
    if(m > this.stimuli.length){
      console.log('error: m > this.stimuli.length')
      return null
    }
    this.selection_m = new Array()
    var rem = this.stimuli.length
    for(var i = 0; i < m; i++){ 
      var qx = rand() * parseFloat(rem), idx = parseInt(qx)
      rem -= 1
      this.selection_m.push(this.stimuli[idx])
      delete this.stimuli[idx]
      this.remove_blanks()
    }
  }
  
  /* for initializing a test phase: mix "N"-selection and "M"-selection together */
  this.reshuffle = function(){
    var to_shuffle = [], i = 0
    
    /* add the "N"-selection */
    for(i = 0; i < this.selection_n.length; i++){
      var dat_i = new Array()
      dat_i.push(this.selection_n[i])
      dat_i.push(true)
      to_shuffle.push(dat_i)
    }      

    /* add the "M"-selection */
    for(i = 0; i < this.selection_m.length; i++){  
      var dat_i = new Array()
      dat_i.push(this.selection_m[i])
      dat_i.push(false)
      to_shuffle.push(dat_i)
    }

    /* "shuffle"-- randomize the ordering of the combined array */
    var shuffled = new Array(), deja_vu = new Array(), rem = to_shuffle.length
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

  this.draw = function(){
    console.log('draw_n()')
    this.draw_n()
    console.log('draw_m()')
    this.draw_m()
    console.log('reshuffle()')
    this.reshuffle()
  }

  /* set N, M parameters and make a selection */
  this.select = function(n,m){
    console.log('select(n,m)')
    this.set_n(n)
    this.set_m(m)
    this.draw()
  }

  /* end of "pool::pool()" */
  return this
}

function stimulus_pool(){
  return new pool()
}
