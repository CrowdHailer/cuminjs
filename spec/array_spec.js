describe('Cumin array operations', function () {
  'use strict';

  var dummy, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    obj = {};
  });

  _.expose('eachArray eachArrayRight mapArray ' +
    'filterArray rejectArray cleave cyclic within');

  describe('eachArray', function () {
    it('should call the function with every element and corresponding index', function () {
      eachArray(dummy)([4, 2]);
      expect(dummy.calls.allArgs()).toEqual([[4, 0], [2, 1]]);
    });
    it('should not call the function when passed an empty array', function () {
      eachArray(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
    it('should be able to break out of the execution', function () {
      dummy.and.returnValue(_.BREAK());
      eachArray(dummy)([4, 2]);
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should maintain context', function () {
      eachArray(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('eachArrayRight', function () {
    it('should call with each value from last', function () {
      eachArrayRight(dummy)([4, 2]);
      expect(dummy.calls.allArgs()).toEqual([[2, 1], [4, 0]]);
    });
    it('should not call for an empty array', function () {
      eachArrayRight(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
    it('should be able to break out of the execution', function () {
      dummy.and.returnValue(_.BREAK());
      eachArrayRight(dummy)([4, 2]);
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should maintain context', function () {
      eachArrayRight(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('mapArray', function(){
    var add3Elements;
    beforeEach(function(){
      add3Elements = mapArray(add3);
    });
    it('should map an array', function(){
      expect(add3Elements([1, 2])).
        toEqual(Object.freeze([4, 5]));
    });
    it('should map an empty array', function(){
      expect(add3Elements([])).
        toEqual(Object.freeze([]));
    });
    it('should maintain context', function () {
      mapArray(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  ddescribe('filterArray and rejectArray', function(){
    var onlyGreaterThan2;
    beforeEach(function(){
      onlyGreaterThan2 = filterArray(greaterThan2);
    });
    it('should filter an array', function(){
      expect(onlyGreaterThan2([1, 3])).
        toEqual(Object.freeze([3]));
    });
    it('should filter an empty array', function(){
      expect(onlyGreaterThan2([])).
        toEqual(Object.freeze([]));
    });
    it('should maintain context', function () {
      filterArray(dummy).call(obj, [4, 2]);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
    it('should reject values from an array', function(){
      expect(rejectArray(greaterThan2)([1, 3])).
        toEqual(Object.freeze([1]));
    });
  });

  describe('cleave', function () {
    it('should split an array', function () {
      expect(cleave(2)([0, 1, 2, 3, 4]))
        .toEqual([[0, 1], [2, 3, 4]]);
    });
    it('should split an array with arument 0', function () {
      expect(cleave(0)([0, 1]))
        .toEqual([[], [0, 1]]);
    });
    it('should work with negative arguments', function () {
      expect(cleave(-2)([0, 1, 2, 3, 4]))
        .toEqual([[0, 1, 2], [3, 4]]);
    });
  });

  describe('cyclic', function () {
    it('should cyclicly fill results array', function () {
      var answer = cyclic(3)([0, 1, 2, 3, 4, 5]);
      expect(answer).toEqual([[0, 3], [1, 4], [2, 5]]);
    });
    it('should have empty arrays it array shorter than division', function () {
      var answer = cyclic(3)([1]);
      expect(answer).toEqual([[1], [], []]);
    });
  });

  describe('within', function () {
    // could return object {value: true/false, location: first occurance}
    it('return true if test element is in  array', function () {
      var withinRange = within([2, 3, 4]);
      expect(withinRange(2)).toBe(true);
      expect(withinRange(1)).toBe(false);
    });
    it('should work with multi arguments', function (){
      var withinRange = within(2, 3, 4);
      expect(withinRange(4)).toBe(true);
      expect(withinRange(1)).toBe(false);
    });
  });

  describe('includes', function () {
    it('can be composed from primatives', function () {
      var includes = compose(any, equals);
      var includes2 = includes(2);
      // LARGE ISSUE WITH ANY ALL MEMORY BETWEEN RUNS
      expect(includes2([1,3])).toBe(false);
      expect(includes2([1,2,3])).toBe(true);
    });
  });
});