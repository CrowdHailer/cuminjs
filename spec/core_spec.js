describe('Cumin core functions', function () {
  'use strict';

  var dummy;
  beforeEach(function () {
    dummy = jasmine.createSpy();
  });

  _.expose('each ');

  ddescribe('each', function () {
    it('should call every element over an array', function () {
      each(dummy)([1, 2]);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy).toHaveBeenCalledWith(2, 1);
    });
    it('should call every value in an object', function () {
      each(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1, 'x');
      expect(dummy).toHaveBeenCalledWith(2, 'y');
    });
    it('should call operation for a list of arguments', function () {
      each(dummy)(1, 2);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy).toHaveBeenCalledWith(2, 1);
    });
    it('should not call operation for an empty array', function () {
      each(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
    it('should not call operation for an empty object', function () {
      each(dummy)({});
      expect(dummy).not.toHaveBeenCalled();
    });
  });
});