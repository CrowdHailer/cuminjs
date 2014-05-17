function hasK(permitted){
  var permitted = argsToList(arguments);
  return function(value, key){
    return permitted.indexOf(key) !== -1;
  };
}
// limit = function(){
//   var args = argsToList(arguments);
//   return filter(hasK(args));
// };

limit = _.compose(_.filter, hasK);