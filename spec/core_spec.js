describe('Cumin core functions', function () {
  'use strict';

  var dummy, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    obj = {};
  });

  _.expose('each map filter reject reduce');

  describe('each', function () {
    it('should call the operation with every element and index of an array', function () {
      each(dummy)([4, 2]);
      expect(dummy.calls.allArgs()).toEqual([[4, 0], [2, 1]]);
    });
    it('should call the operation with every value and key in an object', function () {
      each(dummy)({x: 4, y: 2});
      expect(dummy.calls.allArgs()).toEqual([[4, 'x'], [2, 'y']]);
    });
    it('should call the operation with every element and index in a list of arguments', function () {
      each(dummy)(4, 2);
      expect(dummy.calls.allArgs()).toEqual([[4, 0], [2, 1]]);
    });
    it('should not call the operation for an empty array', function () {
      each(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
    it('should not call the operation for an empty object', function () {
      each(dummy)({});
      expect(dummy).not.toHaveBeenCalled();
    });
    it('should be able to break out of the execution with an array', function () {
      dummy.and.returnValue(_.BREAK());
      each(dummy)([4, 2]);
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should be able to break out of the execution with an object', function () {
      dummy.and.returnValue(_.BREAK());
      each(dummy)({x: 4, y: 2});
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should maintain context when calling an array', function () {
      each(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
    it('should maintain context when calling an object', function () {
      each(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('map', function () {
    var add3All;
    beforeEach(function () {
      add3All = map(add3);
    });
    it('should map arrays', function () {
      var answer = add3All([1, 2, 3]);
      expect(answer).toEqual(Object.freeze([4, 5, 6]));
    });
    it('should map objects', function () {
      var answer = add3All({x: 1, y: 2});
      expect(answer).toEqual(Object.freeze({x: 4, y: 5}));
    });
    it('should map arguments if given multiple', function () {
      var answer = add3All(1, 2, 3);
      expect(answer).toEqual(Object.freeze([4, 5, 6]));
    });
    it('should maintain context when mapping an array', function () {
      map(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
    it('should maintain context when mapping an object', function () {
      map(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('filter', function () {
    it('should filter from array', function () {
      expect(filter(greaterThan2)([1, 3, 2])).toEqual(Object.freeze([3]));
    });
    it('should filter from object', function () {
      expect(filter(greaterThan2)({x: 1, y: 3, z: 2})).toEqual(Object.freeze({y: 3}));
    });
    it('should filter from arguments', function () {
      expect(filter(greaterThan2)(1, 3, 2)).toEqual(Object.freeze([3]));
    });
    it('should maintain context when calling an array', function () {
      filter(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
    it('should maintain context when filtering an object', function () {
      filter(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('reject', function () {
    it('should reject from array', function () {
      expect(reject(greaterThan2)([1, 3, 2])).toEqual(Object.freeze([1, 2]));
    });
    it('should reject from object', function () {
      expect(reject(greaterThan2)({x: 1, y: 3, z: 4})).toEqual(Object.freeze({x: 1}));
    });
    it('should reject from arguments', function () {
      expect(reject(greaterThan2)(1, 3, 2)).toEqual(Object.freeze([1, 2]));
    });
    xit('should maintain context when calling an array', function () {
      reject(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
    xit('should maintain context when calling an object', function () {
      reject(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('reduce', function () {
    var sum, asString;
    beforeEach(function () {
      sum = reduce(0)(add);
      asString = reduce('')(function (memo) {
        return function (item, location) {
          return memo + location + ':' + item + ',';
        };
      });
    });
    it('should reduce a list', function () {
      expect(sum([1, 2, 3])).toEqual(6);
    });
    it('should reduce a list without an initial value', function () {
      expect(reduce()(add)([1, 2, 3])).toEqual(6);
    });
    it('should reduce an object', function () {
      expect(sum({x: 1, y: 3, z: 2})).toEqual(6);
    });
    it('should reduce arguments', function () {
      expect(sum(1, 2, 3)).toEqual(6);
    });
    it('should reduce empty list', function () {
      expect(sum([])).toEqual(0);
    });
    it('should reduce empty object', function () {
      expect(sum({})).toEqual(0);
    });
    it('should take initial value from array if not given an initial', function () {
      expect(reduce()(add)([1, 2, 3])).toEqual(6);
    });
    it('should take initial value from object if not given initial', function () {
      expect(reduce()(add)({x: 1, y: 3, z: 2})).toEqual(6);
    });
    it('should take initial value from arguments if not given initial', function () {
      expect(reduce()(add)(1, 2, 3)).toEqual(6);
    });
    it('should be able to use array index', function () {
      expect(asString([1, 2])).toEqual('0:1,1:2,');
    });
    it('should be able to use arguments index', function () {
      expect(asString(1, 2)).toEqual('0:1,1:2,');
    });
    it('should be able to use object key', function () {
      expect(asString({x: 1, y: 3})).toEqual('x:1,y:3,');
    });
    it('should reset memory each time it is used', function () {
      expect(sum([1, 2, 3])).toEqual(6);
      expect(sum([1, 2, 3])).toEqual(6);
    });
    it('should maintain context', function () {
      var dummer = jasmine.createSpy();
      dummer.and.returnValue(2);
      dummy.and.returnValue(dummer);
      reduce(0)(dummy).call(obj, [1, 2, 3]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
      expect(dummer.calls.mostRecent().object).toBe(obj);
    });
  });
});