var _ = (function(){
  function map(operation){
    return function(collection){
      var results = [];
      collection.forEach(function(value){
        results.push(operation(value));
      });
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
  return {
    map: map,
    compose: compose,
    dot: dot
  };
}());