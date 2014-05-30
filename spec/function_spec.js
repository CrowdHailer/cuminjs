describe('function "ahem" functions', function(){
  _.expose('compose times not');

  describe('compose', function(){
    it('should combine functions', function(){
      var compound = compose(add3, multiply2);
      expect(compound(2)).toEqual(7);
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
      expect(dummy.calls.length).toEqual(3);
    });
    it('should not call the function given 0 or less', function(){
      times(0)(dummy);
      times(-1)(dummy);
      expect(dummy.calls.length).toEqual(0);
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