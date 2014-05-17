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

  //not working
  var all = _.compose(_.reduce(true), and);
  // end
  namespace.limit = limit;
  namespace.weed = weed;
  namespace.all = all;
  namespace.pluck = pluck;
  // weed = _.compose(_.filter, not(hasK));
}(_));