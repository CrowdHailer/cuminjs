describe('compositions', function(){
  describe('limit by keys', function(){
    var obj;
    beforeEach(function(){
      obj = {a: 1, b: 2, c: 3};
    });
    it('should restrict on keys', function(){
      var limited = limit('a')(obj);
      expect(limited).toEqual({a: 1});
    });
    it('should restrict on multiple keys', function(){
      var limited = limit('a', 'b')(obj);
      expect(limited).toEqual({a: 1, b: 2});
    });
    it('should not add values not on original', function(){
      var limited = limit('a', 'd')(obj);
      expect(limited).toEqual({a: 1});
    });
  });
});