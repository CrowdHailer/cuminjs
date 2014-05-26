var argsToList = function(x){
  return Array.prototype.slice.call(x);
};

var isArray = function(obj) {
  return (obj && obj.constructor === Array);
};

var isObj = function(obj) {
  return (typeof obj === "object" && !isArray(obj));
};

var isDefined = function(obj) {
  return (obj !== undefined);
};
// Definitions
// Arrays have index, element
// Objects have key, value
// Colletions have location, item

// uses underscore namespace,
// provides duplicate functionality for underscore.

// functions return frozen objects

// JavaScript all things? function(executable method invokable), collection, primitive, void(null undef)
var _ = (function(){

// basic iterators

  function eachArray(operation){
  // iterates array left to right
  // assumes array type
    return function(array){
      for (var i = 0; i < array.length; i++) {
        operation(array[i], i);
      }
    };
  }

  function eachArrayRight(operation){
  // iterates array right to left
  // assumes array type
    return function(array){
      for (var i = array.length - 1; i > -1; i--) {
        operation(array[i], i);
      }
    };
  }

  function eachObject(operation){
  // iterates through object key/value pairs
  // no order assumed
    return function(object){
      eachArray(function(key){
        operation(object[key], key);
      })(Object.keys(object));
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
        eachArray(operation)(collection);
      } else {
        eachObject(operation)(collection);
      }
    };
  }

// Basic collection operations

  function mapArray(operation){
    return function(array){
      var results = [];
      eachArray(function(element, index){
        results.push(operation(element, index));
      })(array);
      return Object.freeze(results);
    };
  }

  function mapObject(operation){
    return function(object){
      var results = {};
      eachObject(function(value, key){
        results[key] = operation(value, key);
      })(object);
      return Object.freeze(results);
    };
  }

  function map(operation){
    return function(collection){
      if (arguments.length > 1) {
        collection = argsToList(arguments);
      }
      if (isArray(collection)) {
        return mapArray(operation)(collection);
      } else {
        return mapObject(operation)(collection);
      }
    };
  }

  function filterArray(operation){
    return function(array){
      var results = [];
      eachArray(function(element, index){
        if (operation(element, index)) { results.push(element); }
      })(array);
      return Object.freeze(results);
    };
  }

  var rejectArray = compose(filterArray, not);

  function filterObject(operation){
    return function(object){
      var results = {};
      eachObject(function(value, key){
        if (operation(value, key)) { results[key] = value;}
      })(object);
      return Object.freeze(results);
    };
  }

  var rejectObject = compose(filterObject, not);

  function filter(operation){
    return function(collection){
      if (arguments.length > 1) {
        collection = argsToList(arguments);
      }
      if (isArray(collection)) {
        return filterArray(operation)(collection);
      } else {
        return filterObject(operation)(collection);
      }
    };
  }

  var reject = compose(filter, not);

  function reduce(memo){
    // The same code works here for arrays and objects so does not have varient.
    return function(operation){
      return function(){
        each(function(item, location){
          memo = isDefined(memo) ? operation(memo)(item, location) : item;
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

  function min(operation){
    operation = operation || I;
    return function(){
      var memo;
      each(function(item){
        memo = memo && (operation(memo) < operation(item)) ? memo : item;
      }).apply({}, arguments);
      return memo;
    };
  }

  function max(operation){
    operation = operation || I;
    return function(){
      var memo;
      each(function(item){
        memo = memo && (operation(memo) > operation(item)) ? memo : item;
      }).apply({}, arguments);
      return memo;
    };
  }

// Array

  function cyclic(n){
    var results = [];
    return function(collection){
      eachArray(function(element, index){
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
      eachArray(function(key){
        results[key] = obj[key];
      })(Object.keys(obj));
      eachArray(function(key){
        results[key] = extention[key];
      })(Object.keys(extention));
      return results;
    };
  }

  function extend(extra){
    return function(object){
      eachObject(function(value, key){
        object[key] = value;
      })(extra);
    };
  }


  function basic(object){
    return function(extra){
      eachObject(function(value, key){
        object[key] = value;
      })(extra);
    };
  }


// Function operations

  function compose(){
    var funcs = arguments;
    return function(){
      var args = arguments;
      eachArrayRight(function(func){
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

// Utilities

  function I(x){
    return x;
  }

  function dot(key){
    return function(obj){
      return obj[key];
    };
  }

  function times(n){
    return function(operation){
      for (var i = 0; i < n; i++){
        operation();
      }
    };
  }

  function random(max){
    return function(){
      return Math.random()*max|0;
    };
  }

  function expose(nameList){
    var fNames = nameList.split(' ');
    eachArray(function(fName){
      window[fName] = _[fName];
    })(fNames);
  }

  var _ =  {
    eachArray: eachArray,
    eachArrayRight: eachArrayRight,
    eachObject: eachObject,
    each: each,

    mapArray: mapArray,
    mapObject: mapObject,
    map: map,

    filterArray: filterArray,
    rejectArray: rejectArray,
    filterObject: filterObject,
    rejectObject: rejectObject,
    filter: filter,
    reject: reject,
    reduce: reduce,

    all: all, //poss every 
    any: any, //poss sum use any as anything eg first from obj or and shift to obj
    min: min, 
    max: max,

    cyclic: cyclic,
    merge: merge,
    extend: extend,
    basic: basic,

    compose: compose,
    not: not,

    I: I,
    dot: dot,
    times: times,
    random: random,

    expose: expose,
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