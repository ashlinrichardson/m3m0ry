/* 
stimulus pool - object that has words or images added to it. 
- selections are drawn randomly for `study phase' (by the draw() method)
- that selection is shuffled back into the deck, for the `test phase'

*/
function pool(){//ctx){
  this.ctx = ctx;
  this.stimuli = new Array();
  this.add = function(stim){
    this.stimuli.push(stim);
    return stim;
  };

  // draw a pseudorandom selection of size 'm'
  this.draw = function(m){
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
      console.log(rem, '=rem,','idx '+ idx.toString()+','+qx.toString(), this.stimuli[idx], this.stimuli);
      this.selection.push(this.stimuli[idx]);

      // deleting doesn't empty (strange..).. it cuts out, but it leaves a hole..:P
      delete this.stimuli[idx];
      // remove empty elements.. 
      this.stimuli = this.stimuli.filter(function() { return true; });

    }
      };
  return this;
};

