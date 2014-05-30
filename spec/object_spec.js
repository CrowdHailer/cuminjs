describe('Object only operations', function(){
  describe('augment', function(){
    // attach, append
    _.expose('augment');
    it('should add key value pairs to object', function(){
      var obj = {x: 1};
      _.augment(obj)({y: 2});
      expect(obj).toEqual({x: 1, y: 2});
    });
    it('should overwrite existing values on the passed object', function(){
      var obj = {x: 1, y: 2};
      _.augment(obj)({x: 2});
      expect(obj).toEqual({x: 2, y: 2});
    });
    it('should return the augmented object', function(){
      var obj = {x: 1};
      expect(_.augment(obj)({x: 2})).toBe(obj);
    });
  });
});