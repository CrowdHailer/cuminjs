argsToList = function(x){
  return Array.prototype.slice.call(x);
}

isArray = function(obj) {
  return (obj && obj.constructor == Array);
}

isObj = function(obj) {
  return (typeof obj == "object" && !isArray(obj));
}