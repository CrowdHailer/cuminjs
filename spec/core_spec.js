describe('Cumin core functions', function () {
  'use strict';

  var dummy;
  beforeEach(function () {
    dummy = jasmine.createSpy();
  });

  _.expose('each ');

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
  });
});