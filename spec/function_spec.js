describe('Cumin function operations', function () {
  'use strict';

  var dummy, returnContext, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    returnContext = function () { return this; };
    obj = {};
  });

  _.expose('adjoin compose invoke times not postpone debounce');

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
  });

  describe('invoke', function () {
    it('should hold arguments for a passed function', function () {
      var pass3 = invoke(3);
      pass3(dummy);
      expect(dummy).toHaveBeenCalledWith(3);
    });
    it('should keep context when operating unbound', function () {
      var pass3 = invoke(3);
      var a = pass3(returnContext);
      expect(a).toEqual(returnContext());
    });
    it('should keep context when bound to object', function () {
      obj.pass3 = invoke(3);
      expect(obj.pass3(returnContext)).toBe(obj);
    });
    it('should keep context when specifically set', function () {
      var pass3 = invoke(3);
      expect(pass3.call(obj, returnContext)).toBe(obj);
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
    it('should keep context when operating unbound', function () {
      var a = returnContext();
      var b = postpone(returnContext)();
      expect(a).toEqual(b);
    });
    it('should keep context when bound to object', function () {
      obj.returnContext = returnContext;
      obj.delayed = postpone(obj.returnContext);
      expect(obj.delayed()).toBe(obj);
    });
    it('should keep context when specifically set', function () {
      var delayed = postpone(returnContext);
      expect(delayed.call(obj)).toBe(obj);
    });
  });

  describe('times', function () {
    it('should call a function n times', function () {
      var thrice = times(3);
      thrice(dummy);
      expect(dummy.calls.count()).toEqual(3);
    });
    it('should not call the function given 0 or less', function () {
      times(0)(dummy);
      times(-1)(dummy);
      expect(dummy.calls.count()).toEqual(0);
    });
    it('should call the function with the indecies', function () {
      var twice = times(2);
      twice(dummy);
      expect(dummy).toHaveBeenCalledWith(0);
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).not.toHaveBeenCalledWith(2);
    });
  });

  describe('debounce', function () {
    xit('should call with the latest arguments', function(done){
      var late = debounce(1)(dummy);
      late(3);
      setTimeout(function ()  {
        expect(dummy).toHaveBeenCalledWith(3);
        done();
      }, 2);
      expect(dummy).not.toHaveBeenCalledWith(3);
    });
    xit('should call after activity', function () {
      var late = debounce(2)(dummy);
      var time = spyOn(_, 'now').andReturn(0);
      late(3);
      time.andReturn(1);
      late(4);
      expect(dummy.calls.length).toEqual(1);
    });
  });

  describe('not', function () {
    it('should late eval truthy statments', function () {
      var lessThan2 = not(greaterThan2);
      expect(lessThan2(1)).toBe(true);
    });
  });
});