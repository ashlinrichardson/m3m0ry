/* via developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/clearTimeout */
var egg_timer = {

  /* callback */
  setup: function(t_ms){
    if(typeof this.timeoutID === "number"){
      this.cancel()
    }
    this.timeoutID = window.setTimeout(function(){ 
        console.log('timeout')
        var now = ctx.get_state()
        var id = now.id;
        console.log('ding from now(): id', id);
        now.ding = true
        if(now.key_expiry ==false){
          now.expire()
        }
    }.bind(this), t_ms)
  }, cancel: function() {
    window.clearTimeout(this.timeoutID)
    this.timeoutID = undefined
  }
}
