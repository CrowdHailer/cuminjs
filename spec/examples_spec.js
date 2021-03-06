function power(n) {
  'use strict';

  return function (x) {
    return Math.pow(x, n);
  };
}
function add(a) {
  'use strict';

  return function (b) {
    return a + b;
  };
}

describe('Demonstrating usage with mathematical operations', function () {
  'use strict';

  var square, cube, increment, sum;
  beforeEach(function () {
    defreeze();
  });
  it('From a curried power function, build a function that always squares/cubes a number', function () {
    square = power(2);
    cube = power(3);
    expect(square(7)).toEqual(49);
    expect(cube(3)).toEqual(27);
  });

  it('Combining functions to create new functions, In this case square then plus 1', function () {
    increment = add(1);
    var squarePlusOne = compose(increment, square);
    expect(squarePlusOne(4)).toEqual(17);
  });

  it('Arrays can be mapped by any function, in this case increment', function () {
    var array = [0, 1, 2];
    var incrementEvery = map(increment);
    expect(incrementEvery(array)).toEqual([1, 2, 3]);
  });

  it('General combination operations can be built from curried function and reduce. In this case to create a sum function', function () {
    sum = reduce(0)(add);
    expect(sum([1, 2, 3])).toEqual(6);
  });

  it('Trivially create complex operations in this case calculate the distance to a point in n-dimensional space', function () {
    var hypotetunesLength = compose(power(0.5), sum, map(square));
    expect(hypotetunesLength([2, 3, 6])).toEqual(7);
  });

  it('Apply reverse order of calls to function with invoke, here raise to the power of each array element', function () {
    var array =[0, 1, 2, 3];
    var TwoToTheNth = compose(invoke(2), power);
    expect(map(TwoToTheNth)(array)).toEqual([1, 2, 4, 8]);
  });
});

describe('Atlas Demonstration of Object manipulations', function () {
  'use strict';

  var atlas, argentina, belize, canada, denmark;
  beforeEach(function () {
    argentina = {argentina: {area: 200, population: 500}};
    belize    = {belize:    {area: 2000, population: 1200}};
    canada    = {canada:    {area: 400, population: 800}};
    denmark   = {denmark:   {area: 4500, population: 5000}};
  });

  it('Squash many objects with reduce and foundation', function () {
    // possible capitalise
    atlas = reduce({})(foundation)(argentina, belize, canada, denmark);
    expect(atlas.argentina.area).toEqual(200);
    expect(atlas.canada.population).toEqual(800);
  });

  it('Make a permanent fetch function using dot', function () {
    var getBelize = dot('belize');
    expect(getBelize(atlas)).toEqual({ area : 2000, population : 1200 });
    atlas.belize.capital = 'Unsure';
    expect(getBelize(atlas)).toEqual({ area : 2000, population : 1200, capital : 'Unsure' });
  });

  it('Filter by population', function () {
    atlas = reduce({})(foundation)(argentina, belize, canada, denmark);
    var populationGreaterThan1000 = compose(greater(1000), dot('population'));
    expect(filter(populationGreaterThan1000)(atlas))
      .toEqual({belize: {area: 2000, population: 1200}, denmark: {area: 4500, population: 5000}});
  });

  //dot as setter
  // pop density
});


  // area pop country

  // shopping list