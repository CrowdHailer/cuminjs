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
function not(func){
  return function(){
    var args = argsToList(arguments);
    return !func.apply({}, args);
  };
}
limit = _.compose(_.filter, hasK);
weed = _.compose(_.filter, hasNotK);
// weed = _.compose(_.filter, not(hasK));