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
      var context = {empty: []};
      for (var i = 0; i < arr.length; i++) {
        item = arr[i];
        operation.call(context, item, i);
      }
    };
  }

  function each(operation){
    return function(collection){
      if (arguments.length > 1) {
        collection = Array.prototype.slice.call(arguments);
      }
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
      return Object.freeze(results);
    };
  }

  function filter(operation){
    return function(){
      var results;
      each(function(item, index){
        results = this.empty;
        if (operation.call({}, item, index)) {
          index = (results.length !== undefined)? results.length : index;
          results[index] = item;
        }
        //add push methd to object
        // endless curry push function
      }).apply({}, arguments);
      return results;
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