// adapted from developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout
var egg_timer = {
  setup: function(t_ms, callback){
    this.my_callback = callback;
    if (typeof this.timeoutID === "number")
      this.cancel();
    this.timeoutID = window.setTimeout(function(){
      callback();
    }.bind(this), t_ms);
  },
  cancel: function() {
    window.clearTimeout(this.timeoutID);
    this.timeoutID = undefined;
  }
}; 
