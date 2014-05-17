function hasK(permitted){
  var permitted = argsToList(arguments);
  return function(value, key){
    return permitted.indexOf(key) !== -1;
  };
}
function hasNotK(permitted){
  var permitted = argsToList(arguments);
  return function(value, key){
    return permitted.indexOf(key) === -1;
  };
}

limit = _.compose(_.filter, hasK);
weed = _.compose(_.filter, hasNotK);