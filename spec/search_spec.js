describe('cumin utilities', function () {
  'use strict';

  var dummy, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    obj = {};
  });

  _.expose('find all any min max');

  describe('find', function () {
    it('should return the first element that passes the predicate', function () {
      expect(find(greaterThan2)([1, 3, 4])).toEqual(3);
    });
    it('should return undefined if no elements pass', function () {
      expect(find(greaterThan2)([1, 0])).toEqual(undefined);
    });
    it('should return undefined from an empty array', function () {
      expect(find(greaterThan2)([])).toEqual(undefined);
    });
    it('should stop searching after finding a value', function () {
      dummy.and.returnValue(true);
      find(dummy)([1, 2]);
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should maintain context', function () {
      var search = find(dummy);
      search.call(obj, [1]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('all', function () {
    it('should check elements of an array', function () {
      expect(all(greaterThan2)([3, 4])).toBe(true);
      expect(all(greaterThan2)([1, 0])).toBe(false);
    });
    it('should check values of an object', function () {
      expect(all(greaterThan2)({x: 3, y: 4})).toBe(true);
      expect(all(greaterThan2)({x: 0, y: 1})).toBe(false);
    });
    it('should check all arguments', function () {
      expect(all(greaterThan2)(3, 4)).toBe(true);
      expect(all(greaterThan2)(1, 0)).toBe(false);
    });
    it('should optionally check object keys', function () {
      function singleCharKey(value, key) {
        return key.length === 1;
      }
      expect(all(singleCharKey)({x: 3, y: 4})).toBe(true);
      expect(all(singleCharKey)({xy: 3, y: 4})).toBe(false);
    });
    it('should use values if not give a function', function () {
      expect(all()([true, true])).toEqual(true);
      expect(all()(true, false)).toEqual(false);
      expect(all()({x: false})).toEqual(false);
    });
    it('should reset internal memo each time it is used', function () {
      var allGreaterThan2 = all(greaterThan2);
      expect(allGreaterThan2([1, 3])).toBe(false);
      expect(allGreaterThan2([4, 3])).toBe(true);
    });
  });

  describe('any', function () {
    it('should check elements of an array', function () {
      expect(any(greaterThan2)([1, 4])).toBe(true);
      expect(any(greaterThan2)([1, 0])).toBe(false);
    });
    it('should check values of an object', function () {
      expect(any(greaterThan2)({x: 1, y: 4})).toBe(true);
      expect(any(greaterThan2)({x: 0, y: 1})).toBe(false);
    });
    it('should check all arguments', function () {
      expect(any(greaterThan2)(1, 4)).toBe(true);
      expect(any(greaterThan2)(1, 0)).toBe(false);
    });
    it('should optionally check object keys', function () {
      function singleCharKey(value, key) {
        return key.length === 1;
      }
      expect(any(singleCharKey)({x: 3, y: 4})).toBe(true);
      expect(any(singleCharKey)({xy: 3, cy: 4})).toBe(false);
    });
    it('should use values if not give a function', function () {
      expect(any()([true, true])).toEqual(true);
      expect(any()(true, false)).toEqual(true);
      expect(any()({x: false})).toEqual(false);
    });
    it('should reset internal memo each time it is used', function () {
      var anyGreaterThan2 = any(greaterThan2);
      expect(anyGreaterThan2([1, 3])).toBe(true);
      expect(anyGreaterThan2([1, 1])).toBe(false);
    });
  });

  describe('min', function () {
    var minLength;
    beforeEach(function () {
      minLength = min(function (item) {
        return item.length;
      });
    });
    it('should return minimum using function from array', function () {
      expect(minLength(['a', 'bb'])).toEqual('a');
    });
    it('should return minimum from an array of one', function () {
      expect(minLength(['bb'])).toEqual('bb');
    });
    it('should return minimum from an object', function () {
      expect(minLength({x: 'a', y: 'bb'})).toEqual('a');
    });
    it('should return minimum from a selection of arguments', function () {
      expect(minLength('a', 'bb')).toEqual('a');
    });
    it('should work from values given no comparison', function () {
      expect(min()([1, 2, 3, 4])).toEqual(1);
    });
  });

  describe('max', function () {
    var maxLength;
    beforeEach(function () {
      maxLength = max(function (item) {
        return item.length;
      });
    });
    it('should return maximum using function from array', function () {
      expect(maxLength(['a', 'bb'])).toEqual('bb');
    });
    it('should return maximum from an array of one', function () {
      expect(maxLength(['bb'])).toEqual('bb');
    });
    it('should return maximum from an object', function () {
      expect(maxLength({x: 'a', y: 'bb'})).toEqual('bb');
    });
    it('should return maximum from a selection of arguments', function () {
      expect(maxLength('a', 'bb')).toEqual('bb');
    });
    it('should work from values', function () {
      expect(max()(1, 2, 3)).toEqual(3);
    });
  });

  
});