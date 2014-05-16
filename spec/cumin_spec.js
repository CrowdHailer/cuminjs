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
    it('should leave main namespace clear', function(){
      expect(function(){
        dot();
      }).toThrow("Can't find variable: dot");
    });
    it('should make functions available on top namespace', function(){
      _.expose('dot', 'map', 'each', 'eachArr', 'eachObj', 'map',
               'compose', 'dot', 'limit', 'extend'
              );
      expect(function(){
        dot();
        map();
      }).not.toThrow();
    });
  });
  describe('each', function(){
    beforeEach(function(){
    });
    it('should call every element over an array', function(){
      each(dummy)([1, 2]);
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
      eachObj(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).toHaveBeenCalledWith(2);
    });
  });
  describe('eachArr', function(){
    it('should each all values in an array', function(){
      eachArr(dummy)([1, 2]);
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).toHaveBeenCalledWith(2);
    });
    it('call the arguments array if give multi args', function(){
      eachArr(dummy)(1, 2);
      expect(dummy).toHaveBeenCalledWith(1);
      expect(dummy).toHaveBeenCalledWith(2);
    });
  });
  describe('map', function(){
    it('should map arrays', function(){
      var add3All = map(add3);
      expect(add3All([1, 2, 3])).toEqual([4, 5, 6]);
    });
  });
  describe('limit', function(){
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
  describe('extend', function(){
    it('should extend an object', function(){
      var obj = {a: 1};
      var extended = extend({e: 5})(obj);
      expect(extended).toEqual({a: 1, e: 5});
    });
  });
  describe('compose', function(){
    it('should combine functions', function(){
      var compound = compose(add3, multiply2);
      expect(compound(2)).toEqual(7);
    });
  });
  describe('dot', function(){
    it('should pull an objects value', function(){
      var person = {name: 'Mike'};
      var name = dot('name');
      expect(name(person)).toEqual('Mike');
    });
  });
});