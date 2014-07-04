describe('Cumin function operations', function () {
  'use strict';

  var dummy, returnContext, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    returnContext = function () { return this; };
    obj = {};
  });

  _.expose('adjoin compose invoke times not postpone debounce throttle');

  describe('adjoin', function () {
    it('should combine two functions', function () {
      var compound = adjoin(add3)(multiply2);
      expect(compound(2)).toEqual(7);
    });
    it('should pass all arguments to first function', function () {
      var sum = _.reduce(0)(add);
      var compound = adjoin(multiply2)(sum);
      expect(compound(2, 3, 4)).toEqual(18);
    });
    it('should keep maintain context', function () {
      var dummer = jasmine.createSpy();
      var compound = adjoin(dummer)(dummy);
      compound.call(obj);
      expect(dummy.calls.mostRecent().object).toBe(obj);
      expect(dummer.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('compose', function () {
    it('should combine functions', function () {
      var compound = compose(add3, multiply2);
      expect(compound(2)).toEqual(7);
    });
    it('should maintain context', function () {
      var dummer = jasmine.createSpy();
      var compound = compose(dummy, dummer);
      compound.call(obj);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('invoke', function () {
    it('should hold arguments for a passed function', function () {
      var pass3 = invoke(3, 5);
      pass3(dummy);
      expect(dummy).toHaveBeenCalledWith(3, 5);
    });
    it('should keep context when specifically set', function () {
      var pass3 = invoke(3);
      pass3.call(obj, dummy);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('postpone', function () {
    it('should call a function passed it', function () {
      var later = postpone(dummy);
      expect(dummy.calls.count()).toEqual(0);
      later();
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should pass arguments', function () {
      var later = postpone(dummy, 2, 3);
      later();
      expect(dummy.calls.mostRecent().args).toEqual([2, 3]);
    });
    it('should return function result', function () {
      dummy.and.returnValue(2);
      var later = postpone(dummy);
      expect(later()).toEqual(2);
    });
    it('should keep context when specifically set', function () {
      var delayed = postpone(dummy);
      delayed.call(obj);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('times', function () {
    var twice;
    beforeEach(function () {
      twice = times(2);
    });
    it('should call a function n times', function () {
      twice(dummy);
      expect(dummy.calls.count()).toEqual(2);
    });
    it('should not call the function given 0 or less', function () {
      times(0)(dummy);
      times(-1)(dummy);
      expect(dummy.calls.count()).toEqual(0);
    });
    it('should call the function with the indecies', function () {
      twice(dummy);
      expect(dummy).toHaveBeenCalledWith(0);
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).not.toHaveBeenCalledWith(2);
    });
    it('should maintain context', function () {
      twice.call(obj, dummy);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('not', function () {
    it('should late eval truthy statments', function () {
      var lessThan2 = not(greaterThan2);
      expect(lessThan2(1)).toBe(true);
    });
    it('should maintain context', function () {
      var lessThan2 = not(dummy);
      lessThan2.call(obj);
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
  });

  describe('debounce', function () {
    var late;
    beforeEach(function () {
      late = debounce(1)(dummy);
    });
    it('should call with the latest arguments', function (done) {
      times(3)(late);
      setTimeout(function ()  {
        expect(dummy).toHaveBeenCalledWith(2);
        done();
      }, 2);
    });
    it('should call only once after time period', function (done) {
      times(3)(late);
      setTimeout(function ()  {
        expect(dummy.calls.count()).toEqual(1);
        done();
      }, 2);
    });
    it('should maintain context', function (done) {
      late.call(obj);
      setTimeout(function ()  {
        expect(dummy.calls.mostRecent().object).toBe(obj);
        done();
      }, 2);
    });
    it('should call after activity', function () {
      late();
      expect(dummy).not.toHaveBeenCalled();
    });
  });

  describe('throttle', function () {
    var throttled;
    beforeEach(function () {
      throttled = throttle(1)(dummy);
    });
    it('should call with the latest arguments', function(){
      times(3)(throttled);
      setTimeout(function ()  {
        expect(dummy).toHaveBeenCalledWith(2);
        done();
      }, 2);
    });
  });
});