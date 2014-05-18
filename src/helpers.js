var argsToList = function(x){
  return Array.prototype.slice.call(x);
};

var isArray = function(obj) {
  return (obj && obj.constructor === Array);
};

var isObj = function(obj) {
  return (typeof obj === "object" && !isArray(obj));
};