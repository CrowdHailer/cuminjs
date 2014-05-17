describe('compositions', function(){
  describe('expose', function(){
    it('should leave main namespace clear', function(){
      expect(function(){
        limit();
      }).toThrow("Can't find variable: limit");
    });
    it('should make functions available on top namespace', function(){
      _.expose('weed limit '
              );
      expect(function(){
        limit();
        weed();
      }).not.toThrow();
    });
  });
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

  describe('weed by keys', function(){
    var obj;
    beforeEach(function(){
      obj = {a: 1, b: 2, c: 3};
    });
    it('should restrict on keys', function(){
      var weeded = weed('a')(obj);
      expect(weeded).toEqual({b: 2, c: 3});
    });
    it('should restrict on multiple keys', function(){
      var weeded = weed('a', 'b')(obj);
      expect(weeded).toEqual({c: 3});
    });
    it('should not add values not on original', function(){
      var weeded = weed('a', 'd')(obj);
      expect(weeded).toEqual({b: 2, c: 3});
    });
  });
});