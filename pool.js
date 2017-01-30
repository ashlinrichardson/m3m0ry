/* 
stimulus pool - object that has words or images added to it. 
- selections are drawn randomly for `study phase' (by the draw() method)
- that selection is shuffled back into the deck, for the `test phase'

*/
function pool(ctx){
  console.log('pool');
  this.ctx = ctx;
  this.stimuli = new Array();
  this.add = function(stim){
    console.log('add ',stim);
    this.stimuli.push(stim);
    return stim;
  };

  // draw a pseudorandom selection of size 'm'
  this.draw = function(m){
    console.log('draw');
    if(this.selection){
      console.log('error: selection already made from this pool.');
      return null;
    }
    var n = parseInt(m);
    if(n > this.stimuli.length){
      console.log('error: n > this.stimuli.length');
      return null;
    }
    this.selection = new Array();
    var rem = this.stimuli.length;
    for(var i = 0; i < n; i++){ 
      var qx = rand()*parseFloat(rem); //this.stimuli.length);
      rem -= 1;
      var idx = parseInt(qx);
      //console.log(rem, '=rem,','idx '+ idx.toString()+','+qx.toString(), this.stimuli[idx], this.stimuli);
      this.selection.push(this.stimuli[idx]);

      // deleting doesn't empty (strange..).. it cuts out, but it leaves a hole..:P
      delete this.stimuli[idx];
      // remove empty elements.. 
      this.stimuli = this.stimuli.filter(function() { return true; });

    }
  };

  // for use when initializing a test phase: mixed selection back in with other stimuli.
  this.reshuffle = function(){
    console.log('reshuffle');
    var to_shuffle = []; //new Array();
    var deja_vu = [];
    for(var i=0; i<this.selection.length; i++){
      to_shuffle.push(this.selection[i]);
      deja_vu[this.selection[i]] = true;
    }      
    for(var i=0; i<this.stimuli.length; i++){  
      to_shuffle.push(this.stimuli[i]); 
      deja_vu[this.stimuli[i]] = false;
    } 
    console.log(to_shuffle.length);
    var shuffled = new Array();
    var rem =to_shuffle.length;
    while(rem >0){
      rem -= 1;
      var idx = parseInt(rand() * parseFloat(rem));
      shuffled.push(to_shuffle[idx]);
      console.log('\tpush',idx);
      delete to_shuffle[idx];
      to_shuffle = to_shuffle.filter(function(){return true;});
    }
    var ret = [shuffled, deja_vu];
    return ret;//shuffled;
  };
};

