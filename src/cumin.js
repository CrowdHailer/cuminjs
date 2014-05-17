var _ = (function(){
  //option of immutable return
  // pass index/key to func
  function eachObj(operation){
    return function(obj){
      var keys = Object.keys(obj);
      var context = {empty: {}};
      eachArr(function(key){
        var value = obj[key];
        operation.call(context, value, key);
      })(keys);
    };
  }

  function eachArr(operation){
    return function(arr){
      if (arguments.length > 1) {
        arr = Array.prototype.slice.call(arguments);
      }
      var context = {empty: []};
      for (var i = 0; i < arr.length; i++) {
        item = arr[i];
        operation.call(context, item, i);
      }
    };
  }

  function each(operation){
    return function(collection){
      if (collection.length) {
        eachArr(operation)(collection);
      } else {
        eachObj(operation)(collection);
      }
    };
  }

  function map(operation){
    return function(collection){
      if (arguments.length > 1) {
        collection = Array.prototype.slice.call(arguments);
      }
      var results;
      each(function(item, index){
        results = this.empty;
        results[index] = operation.call({}, item, index);
      })(collection);
      return results;
    };
  }

  function filter(operation){
    return function(collection){
      var results;
      each(function(item, index){
        results = this.empty;
        if (operation.call({}, item, index)) {
          results.push(item);
        }
      })(collection);
      return results
    };
  }

  function limit(){
    var keys = Array.prototype.slice.call(arguments);
    return function(obj){
      var results = {};
      eachArr(function(key){
        results[key] = obj[key];
      })(keys);
      return results;
    };
  }

  function extend(extention){
    return function(obj){
      var results = Object.create({});
      eachArr(function(key){
        results[key] = obj[key];
      })(Object.keys(obj));
      eachArr(function(key){
        results[key] = extention[key];
      })(Object.keys(extention));
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
    eachObj: eachObj,
    eachArr: eachArr,
    limit: limit,
    extend: extend,
    filter: filter
  };
  return _;
}());