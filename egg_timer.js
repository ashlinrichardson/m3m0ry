  // adapted from developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout 
  var egg_timer = {
    ding: function(callback) {
      var can_stop = callback();
      if(can_stop){
        this.timeoutID = undefined;
      }
    },
    call_back: function(){
      return (this.callback_obj);
    },
    setup: function(t_ms, my_obj, callback) {
      this.my_callback = callback;
      this.callback_obj = my_obj;
      if (typeof this.timeoutID === "number") {
        this.cancel();
      }
      this.timeoutID = window.setTimeout(function(){ //function(callback)
        this.ding(callback);
      }.bind(this), t_ms, "Wake up!");
    },
  
    cancel: function() {
      window.clearTimeout(this.timeoutID);
      this.timeoutID = undefined;
    }
  };
