var argsToList = function(x){
  return Array.prototype.slice.call(x);
};

var isArray = function(obj) {
  return (obj && obj.constructor === Array);
};

var isObj = function(obj) {
  return (typeof obj === "object" && !isArray(obj));
};
// Definitions
// Arrays have index, element
// Objects have key, value
// Colletions have location, item

// uses underscore namespace,
// provides duplicate functionality for underscore.

// functions return frozen objects
var _ = (function(){

// basic iterators

  function eachArr(operation){
  // iterates array left to right
  // assumes array type
    return function(arr){
      var context = {empty: []};
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        operation.call(context, item, i);
      }
    };
  }

  function eachArrRight(operation){
  // iterates array right to left
  // assumes array type
    return function(arr){
      var context = {empty: []};
      for (var index = arr.length - 1; index > -1; index--) {
        item = arr[index];
        operation.call(context, item, index);
      }
    };
  }

  function eachObj(operation){
  // iterates through object key/value pairs
  // no order assumed
    return function(obj){
      var keys = Object.keys(obj);
      var context = {empty: {}};
      eachArr(function(key){
        var value = obj[key];
        operation.call(context, value, key);
      })(keys);
    };
  }

  function each(operation){
  // iterates through object/array/arguments
  // iterates left to right when given array/arguments
    return function(collection){
      if (arguments.length > 1) {
        collection = argsToList(arguments);
      }
      if (isArray(collection)) {
        eachArr(operation)(collection);
      } else {
        eachObj(operation)(collection);
      }
    };
  }

// Basic collection operations

  function map(operation){
    return function(){
      var results;
      each(function(item, location){
        results = this.empty;
        results[location] = operation.call({}, item, location);
      }).apply({}, arguments);
      return Object.freeze(results);
    };
  }

  function filter(operation){
    return function(){
      var results;
      each(function(item, location){
        results = this.empty;
        if (operation.call({}, item, location)) {
          location = isArray(results)? results.length : location;
          results[location] = item;
        }
      }).apply({}, arguments);
      return Object.freeze(results);
    };
  }

  var reject = compose(filter, not);

  function reduce(memo){
    return function(operation){
      return function(){
        each(function(item, index){
          memo = operation(memo)(item);
        }).apply({}, arguments);
        return memo;
      };
    };
  }

// Higher collection operations

  function all(operation){
    var memo = true;
    operation = operation || I;
    return function(){
      each(function(item, location){
        memo = memo && operation(item, location);
      }).apply({}, arguments);
      return memo;
    };
  }

  function any(operation){
    var memo = false;
    operation = operation || I;
    return function(){
      each(function(item, location){
        memo = memo || operation(item, location);
      }).apply({}, arguments);
      return memo;
    };
  }

  function max(operation){
    return function(collection){
      if (arguments.length > 1) {
        collection = argsToList(arguments);
      }
      var memo = collection.shift();
      each(function(item){
        memo = operation(memo) > operation(item) ? memo : item;
      })(collection);
      return memo;
    };
  }

// Array

  function cyclic(n){
    var results = [];
    return function(collection){
      eachArr(function(element, index){
        if (index < n) {
          results[index] = [element];
        } else {
          results[index % n].push(element);
        }
      })(collection);
      return results;
    };
  }

// Object 

  function merge(extention){
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

  function extend(extra){
    return function(object){
      eachObj(function(value, key){
        object[key] = value;
      })(extra);
    };
  }

// Function operations

  function compose(){
    var funcs = arguments;
    return function(){
      var args = arguments;
      eachArrRight(function(func){
        args = [func.apply(this, args)];
      })(funcs);
      return args[0];
    };
  }

  function not(func){
    return function(){
      return !func.apply({}, arguments);
    };
  }

// Components

  function I(x){
    return x;
  }

  function dot(key){
    return function(obj){
      return obj[key];
    };
  }

// Utilities

  function expose(nameList){
    var fNames = nameList.split(' ');
    eachArr(function(fName){
      window[fName] = _[fName];
    })(fNames);
  }

  var _ =  {
    map: map,
    compose: compose,
    all: all,
    cyclic: cyclic,
    any: any,
    not: not,
    dot: dot,
    expose: expose,
    each: each,
    eachObj: eachObj,
    eachArr: eachArr,
    // limit: limit,
    merge: merge,
    reject: reject,
    extend: extend,
    filter: filter,
    reduce: reduce,
    eachArrRight: eachArrRight,
    max: max
  };
  return _;
}());
(function(namespace){
  function hasK(permitted){
    permitted = argsToList(arguments);
    return function(value, key){
      return permitted.indexOf(key) !== -1;
    };
  }
  function hasNotK(forbidden){
    forbidden = argsToList(arguments);
    return function(value, key){
      return forbidden.indexOf(key) === -1;
    };
  }
  function and(a){
    return function(b){
      return a && b;
    };
  }
  
  var limit = _.compose(_.filter, hasK);
  var weed = _.compose(_.filter, hasNotK);
  var pluck = _.compose(_.map, _.dot);

  // var every = _.reduce(true)(and);


  namespace.limit = limit;
  namespace.weed = weed;
  // namespace.every = every;
  namespace.pluck = pluck;
  namespace.and = and;
  // weed = _.compose(_.filter, not(hasK));
}(_));