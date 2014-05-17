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
  
  var limit = _.compose(_.filter, hasK);
  var weed = _.compose(_.filter, hasNotK);
  namespace.limit = limit;
  namespace.weed = weed;
  // weed = _.compose(_.filter, not(hasK));
}(_));