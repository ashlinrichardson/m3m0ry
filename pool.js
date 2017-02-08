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
    for(var i=0; i<this.selection.length; i++){
      var dat_i = new Array();
      dat_i.push(this.selection[i]);
      dat_i.push(true);
      to_shuffle.push(dat_i);//this.selection[i]);
      console.log('this.selection[i]', this.selection[i], 'true', 'dat_i', dat_i);
    }      
    for(var i=0; i<this.stimuli.length; i++){  
      var dat_i = new Array();
      dat_i.push(this.stimuli[i]);
      dat_i.push(false);
      to_shuffle.push(dat_i);//this.stimuli[i]); 
      console.log('this.stimuli[i]', this.stimuli[i], 'false', 'dat_i', dat_i);
    } 
    console.log(to_shuffle.length);
    var shuffled = new Array();
    var deja_vu = new Array();
    var rem =to_shuffle.length;
    while(rem >0){
      rem -= 1;
      var idx = parseInt(rand() * parseFloat(rem));
      var dat_i = to_shuffle[idx];
      shuffled.push(dat_i[0]);
      deja_vu.push(dat_i[1]);
      console.log('\tpush',idx, to_shuffle.length, dat_i[0]);
      delete to_shuffle[idx];
      to_shuffle = to_shuffle.filter(function(){return true;});
    }
    console.log('deja_vu', deja_vu);
    var ret = [shuffled, deja_vu];
    return ret;//shuffled;
  };
  return this;
};

