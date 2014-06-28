describe('function "ahem" functions', function(){
  _.expose('compose invoke times not postpone');

  describe('compose', function(){
    it('should combine functions', function(){
      var compound = compose(add3, multiply2);
      expect(compound(2)).toEqual(7);
    });
  });

  describe('invoke', function(){
    var dummy;
    beforeEach(function(){
      dummy = jasmine.createSpy();
    });
    it('should hold arguments for a passed function', function(){
      var pass3 = invoke(3);
      pass3(dummy);
      expect(dummy).toHaveBeenCalledWith(3);
    });
  });

  describe('postpone', function(){
    var dummy;
    beforeEach(function(){
      dummy = jasmine.createSpy().and.returnValue(2);
    });
    it('should call a function passed it', function(){
      var later = postpone(dummy);
      expect(dummy.calls.count()).toEqual(0);
      later();    
      expect(dummy.calls.count()).toEqual(1);
    });
    it('should pass arguments', function(){
      var later = postpone(dummy, 2, 3);
      later();    
      expect(dummy.calls.mostRecent().args).toEqual([2, 3]);
    });
    it('should return function result', function(){
      var later = postpone(dummy);
      expect(later()).toEqual(2);
    });
    it('should keep context when operating unbound', function(){
      var returnContext = function(){
        return this;
      };
      var a = returnContext();
      var b = postpone(returnContext)();
      expect(a).toEqual(b);
    });
    it('should keep context when bound unbound', function(){
      var obj = {};
      obj.returnContext = function(){
        return this;
      };
      var a = obj.returnContext();
      obj.delayed = postpone(obj.returnContext);
      var b = obj.delayed();
      expect(a).toEqual(b);
    });
    it('should keep context when specifically set', function(){
      var obj = {};
      var returnContext = function(){
        return this;
      };
      var a = returnContext.call(obj);
      var delayed = postpone(returnContext);
      var b = delayed.call(obj);
      expect(b).toBe(obj);
    });
  });

  describe('times', function(){
    var dummy;
    beforeEach(function(){
      dummy = jasmine.createSpy();
    });
    it('should call a function n times', function(){
      var thrice = times(3);
      thrice(dummy);
      expect(dummy.calls.count()).toEqual(3);
    });
    it('should not call the function given 0 or less', function(){
      times(0)(dummy);
      times(-1)(dummy);
      expect(dummy.calls.count()).toEqual(0);
    });
    it('should call the function with the indecies', function(){
      var twice = times(2);
      twice(dummy);
      expect(dummy).toHaveBeenCalledWith(0);
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).not.toHaveBeenCalledWith(2);
    });
  });

  describe('not', function(){
    it('should late eval truthy statments', function(){
      lessThan2 = not(greaterThan2);
      expect(lessThan2(1)).toBe(true);
    });
  });
});