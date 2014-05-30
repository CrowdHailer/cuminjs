add = function(a){
  return function(b){
    return a + b;
  };
};

multiply = function(a){
  return function(b){
    return a * b;
  };
};

var add3 = add(3);
var multiply2 = multiply(2);