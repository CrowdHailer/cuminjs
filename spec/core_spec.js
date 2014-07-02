describe('Cumin core functions', function () {
  'use strict';

  var dummy, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    obj = {};
  });

  _.expose('each map');

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

  describe('map', function(){
    var add3All;
    beforeEach(function(){
      add3All = map(add3);
    });
    it('should map arrays', function(){
      var answer = add3All([1, 2, 3]);
      expect(answer).toEqual(Object.freeze([4, 5, 6]));
    });
    it('should map objects', function(){
      var answer = add3All({x: 1, y: 2});
      expect(answer).toEqual(Object.freeze({x: 4, y: 5}));
    });
    it('should map arguments if given multiple', function(){
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
});