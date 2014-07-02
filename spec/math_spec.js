describe('Cumin maths library', function(){
  'use strict';

  _.expose('round random');

  describe('round', function(){
    it('should round to integer', function(){
      expect(round()(3.243)).toEqual(3);
      expect(round()(3.743)).toEqual(4);
    });
    it('shoulround to integer number of decimals', function(){
      expect(round(2)(3.243)).toEqual(3.24);
      expect(round(2)(3.747)).toEqual(3.75);
    });
    it('should deal with edgecases well', function(){
      expect(round(2)(1.005)).toEqual(1.01);
      expect(round(2)(1.994)).toEqual(1.99);
    });
  });

  describe('random', function(){
    it('should return a number from 0 up to but not including max', function(){
      var val = random()();
      var val2 = random(4);
      var array = map(function(){
        return val2();
      })([1,1,1,1]);
      expect(all(function(element){
        return -1 < element && element < 4;
      })(array)).toBe(true);
      expect(val).toBe(0);
    });
  });
});