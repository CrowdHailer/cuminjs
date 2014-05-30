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

greater = function(a){
  return function(b){
    return b > a;
  };
};

var add3 = add(3);
var multiply2 = multiply(2);
var greaterThan2 = greater(2);
