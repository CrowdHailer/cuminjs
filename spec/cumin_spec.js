describe('cumin utilities', function(){
  var add;
  beforeEach(function(){
    add = function(a){
      return function(b){
        return a + b;
      };
    };

  });
  describe('map', function(){
    it('should map arrays', function(){

      expect(_.map(add(3))([1,2,3])).toEqual([4,5,6]);
    });
  });
});