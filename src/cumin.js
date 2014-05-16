var _ = (function(){
  //option of immutable return
  // pass index/key to func
  function eachObj(operation){
    return function(obj){
      var keys = Object.keys(obj);
      for (i = 0; i < keys.length; i++) {
        item = obj[keys[i]];
        operation.call(this, item);
      }
    };
  }
  function each(operation){
    return function(collection){
      var i, item;
      if (collection.length) {
        for (i = 0; i < collection.length; i++) {
          item = collection[i];
          operation.call(this, item);
        }
      } else {
        var keys = Object.keys(collection);
        for (i = 0; i < keys.length; i++) {
          item = collection[keys[i]];
          operation.call(this, item);
        }
      }
    };
  }

  function map(operation){
    return function(collection){
      var results = [];
      function push(value){
        results.push(value);
      }
      action = compose(push, operation);
      each(action)(collection);
      return results;
    };
  }

  function compose(){
    var funcs = arguments;
    return function(){
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        var func = funcs[i];
        args = [func.apply(this, args)];
      }
      return args[0];
    };
  }

  function dot(key){
    return function(obj){
      return obj[key];
    };
  }

  function expose(){
    var funcs = arguments;
    for (var i = funcs.length - 1; i >= 0; i--) {
      var name = funcs[i];
      window[name] = _[name];
    }
  }

  var _ =  {
    map: map,
    compose: compose,
    dot: dot,
    expose: expose,
    each: each,
    eachObj: eachObj
  };
  return _;
}());