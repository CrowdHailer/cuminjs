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
  var square, cube, increment, sum;
  it('From a curried power function, build a function that always squares/cubes a number', function(){
    square = power(2);
    cube = power(3);
    expect(square(7)).toEqual(49);
    expect(cube(3)).toEqual(27);
  });

  it('Combining functions to create new functions, In this case square then plus 1', function(){
    increment = add(1);
    var squarePlusOne = compose(increment, square);
    expect(squarePlusOne(4)).toEqual(17);
  });

  it('Arrays can be mapped by any function, in this case increment', function(){
    var array = [0, 1, 2];
    var incrementEvery = map(increment);
    expect(incrementEvery(array)).toEqual([1, 2, 3]);
  });

  it('General combination operations can be built from curried function and reduce. In this case to create a sum function', function(){
    sum = reduce(0)(add);
    expect(sum(1, 2, 3)).toEqual(6);
  });

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