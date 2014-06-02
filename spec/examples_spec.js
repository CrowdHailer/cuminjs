function power(n){
  return function(x){
    return Math.pow(x, n);
  };
}
function add(a){
  return function(b){
    return a + b;
  };
}

describe('Demonstrating usage with mathematical operations', function(){
  var square, cube, increment;
  it('From a curried power function, build a function that always squares/cubes a number', function(){
    square = power(2);
    cube = power(3);
    expect(square(7)).toEqual(49);
    expect(cube(3)).toEqual(27);
  });

  it('combining functions to create new functions', function(){
    increment = add(1);
    var squarePlusOne = compose(increment, square);
    expect(squarePlusOne(4)).toEqual(17);
  });
    // var arr =[1, 2, 3];
    // expect(map(square)(arr)).toEqual([1, 4, 9]);

  xit('should do this too', function(){
    var arr =[1, 2, 3];
    var funcs = map(power)(arr);
    var newstest = map(invoke(2))(funcs);
    expect(newstest).toEqual();
  });

  xit('should also do this', function(){
    var arr = [2, 3, 6];
    var sq = power(2);
    var total = reduce(0)(add)(map(sq)(arr));
    expect(total).toEqual(sq(7))
  });

  // area pop country

  // shopping list
});