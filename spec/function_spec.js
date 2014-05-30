describe('function "ahem" functions', function(){
  _.expose('compose');
  describe('compose', function(){
    it('should combine functions', function(){
      var compound = compose(add3, multiply2);
      expect(compound(2)).toEqual(7);
    });
  });
});