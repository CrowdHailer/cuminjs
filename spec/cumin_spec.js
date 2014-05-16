describe('cumin utilities', function(){
  var add, add3, multiply, multiply2;
  beforeEach(function(){
    add = function(a){
      return function(b){
        return a + b;
      };
    };
    multiply = function(a){
      return function(b){
        return a * b;
      };
    };
    add3 = add(3);
    multiply2 = multiply(2);
  });
  describe('map', function(){
    it('should map arrays', function(){
      var add3All = _.map(add3);
      expect(add3All([1,2,3])).toEqual([4,5,6]);
    });
  });
  describe('compose', function(){
    it('should combine functions', function(){
      var compound = _.compose(add3, multiply2);
      expect(compound(2)).toEqual(7);
    });
  });
});