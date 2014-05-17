describe('cumin utilities', function(){
  var add, add3, multiply, multiply2, greater, greaterThan2, dummy;
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
    greater = function(a){
      return function(b){
        return b > a;
      };
    };
    add3 = add(3);
    multiply2 = multiply(2);
    greaterThan2 = greater(2);
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
      _.expose('dot map each eachArr eachObj not reduce ' +
               'compose dot extend filter'
              );
      expect(function(){
        dot();
        map();
      }).not.toThrow();
    });
  });

  describe('each', function(){
    it('should call every element over an array', function(){
      each(dummy)([1, 2]);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy).toHaveBeenCalledWith(2, 1);
    });
    it('should call every value in an object', function(){
      each(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1, 'x');
      expect(dummy).toHaveBeenCalledWith(2, 'y');
    });

  });

  describe('eachObj', function(){
    it('should each all values of an object', function(){
      eachObj(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1, 'x');
      expect(dummy).toHaveBeenCalledWith(2, 'y');
    });
  });

  describe('eachArr', function(){
    it('should each all values in an array', function(){
      eachArr(dummy)([1, 2]);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy).toHaveBeenCalledWith(2, 1);
    });
    xit('call the arguments array if give multi args', function(){
      eachArr(dummy)(1, 2);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy).toHaveBeenCalledWith(2, 1);
    });
  });

  describe('map', function(){
    var add3All;
    beforeEach(function(){
      add3All = map(add3);
    });
    it('should map arrays', function(){
      var answer = add3All([1, 2, 3]);
      expect(answer).toEqual(Object.freeze([4, 5, 6]));
    });
    it('should map objects', function(){
      var answer = add3All({x: 1, y: 2});
      expect(answer).toEqual(Object.freeze({x: 4, y: 5}));
    });
    it('should map arguments if given multiple', function(){
      var answer = add3All(1, 2, 3);
      expect(answer).toEqual(Object.freeze([4, 5, 6]));
    });
  });

  describe('filter', function(){
    it('should filter from array', function(){
      expect(filter(greaterThan2)([1, 3, 2])).toEqual(Object.freeze([3]));
    });
    it('should filter from object', function(){
      expect(filter(greaterThan2)({x: 1, y: 3, z: 2})).toEqual(Object.freeze({y: 3}));
    });
    it('should filter from arguments', function(){
      expect(filter(greaterThan2)(1, 3, 2)).toEqual(Object.freeze([3]));
    });
  });

  describe('reduce', function(){
    it('should reduce a list', function(){
      expect(_.reduce(0)(add)([1, 2, 3])).toEqual(6);
    });
    it('should reduce an object', function(){
      expect(_.reduce(0)(add)({x: 1, y: 3, z: 2})).toEqual(6);
    });
  });

  describe('not', function(){
    it('should late eval truthy statments', function(){
      lessThan2 = not(greaterThan2);
      expect(lessThan2(1)).toBe(true);
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