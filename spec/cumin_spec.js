describe('cumin utilities', function(){
  var add, add3, multiply, multiply2, dummy;
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
    dummy = jasmine.createSpy();
  });
  describe('expose', function(){
    // forceful, as, expose defaults such as filling missing keys with 0
    it('should make functions available on top namespace', function(){
      _.expose('dot', 'map');
      expect(function(){
        dot();
        map();
      }).not.toThrow();
    });
  });
  describe('each', function(){
    beforeEach(function(){
      _.expose('each');
    });
    it('should call every element over an array', function(){
      each(dummy)([1,2]);
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).toHaveBeenCalledWith(2);
    });
    it('should call every value in an object', function(){
      each(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).toHaveBeenCalledWith(2);
    });

  });
  describe('eachObj', function(){
    it('should each all values of an object', function(){
      _.expose('eachObj');
      eachObj(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).toHaveBeenCalledWith(2);
    });
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
  describe('dot', function(){
    it('should pull an objects value', function(){
      var person = {name: 'Mike'};
      var name = _.dot('name');
      expect(name(person)).toEqual('Mike');
    });
  });
});