describe('provided utility functions', function(){
  _.expose('defreeze refreeze');
  describe('defreeze and refreeze', function(){
    beforeEach(function(){
      _.defreeze();
    });
    afterEach(function(){
      _.refreeze();
    });
    it('should work for mapArray', function(){
      expect(mapArray(add3)([1, 2])).
        toEqual([4, 5]);
    });
    it('should work for mapObject', function(){
      expect(mapObject(add3)({x: 1, y: 2})).
        toEqual({x: 4, y: 5});
    });
    it('should work for filterArray', function(){
      expect(filterArray(greaterThan2)([1, 3])).
        toEqual([3]);
    });
    it('should work for filterObject', function(){
      expect(filterObject(greaterThan2)({x: 1, y: 3})).
        toEqual({y: 3});
    });
    it('should work for foundation', function(){
      expect(foundation({x: 1})({y: 2})).
        toEqual({x: 1, y: 2});
    });
  });
});