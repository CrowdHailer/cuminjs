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
      _.expose('dot map each eachArray eachObject not reduce ' +
               'compose dot extend filter eachArrayRight ' +
               'merge extend all any cyclic reject max min ' +
               'basic times random mapObject mapArray filterArray ' +
               'rejectArray filterObject rejectObject'
              );
      expect(function(){
        dot();
        map();
      }).not.toThrow();
    });
  });

  describe('eachArray', function(){
    it('should each all values in an array', function(){
      eachArray(dummy)([1, 2]);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy.mostRecentCall.args).toEqual([2, 1]);
    });
    it('should not call for an empty array', function(){
      eachArray(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
  });

  describe('eachArrayRight', function(){
    it('should call with each value from last', function(){
      eachArrayRight(dummy)([1, 2]);
      expect(dummy).toHaveBeenCalledWith(2, 1);
      expect(dummy.mostRecentCall.args).toEqual([1, 0]);
    });
    it('should not call for an empty array', function(){
      eachArrayRight(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
  });

  describe('eachObject', function(){
    it('should each all values of an object', function(){
      eachObject(dummy)({x: 1, y: 2});
      expect(dummy).toHaveBeenCalledWith(1, 'x');
      expect(dummy).toHaveBeenCalledWith(2, 'y');
    });
    it('should not have been called for an empty object', function(){
      eachObject(dummy)({});
      expect(dummy).not.toHaveBeenCalled();
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
    it('should call operation for a list of arguments', function(){
      each(dummy)(1, 2);
      expect(dummy).toHaveBeenCalledWith(1, 0);
      expect(dummy).toHaveBeenCalledWith(2, 1);
    });
    it('should not call operation for an empty array', function(){
      each(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
    it('should not call operation for an empty object', function(){
      each(dummy)({});
      expect(dummy).not.toHaveBeenCalled();
    });
  });

  describe('mapArray', function(){
    var add3Elements;
    beforeEach(function(){
      add3Elements = mapArray(add3);
    });
    it('should map an array', function(){
      expect(add3Elements([1, 2])).
        toEqual(Object.freeze([4, 5]));
    });
    it('should map an empty array', function(){
      expect(add3Elements([])).
        toEqual(Object.freeze([]));
    });
    xit('may return value for an object', function(){
      // possible to implement requires mapArray calling each NOT eachArray. unsure.
      expect(add3Elements({x: 1, y: 2})).
        toEqual([4, 5]);
    });
  });

  describe('mapObject', function(){
    var add3Values;
    beforeEach(function(){
      add3Values = mapObject(add3);
    });
    it('should map an object', function(){
      expect(add3Values({x: 1, y: 2})).
        toEqual(Object.freeze({x: 4, y: 5}));
    });
    it('should map an empty object', function(){
      expect(add3Values({})).
        toEqual(Object.freeze({}));
    });
    it('may return value for array', function(){
      expect(add3Values([1, 2])).
        toEqual(Object.freeze({0: 4, 1: 5}));
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

  describe('filterArray and rejectArray', function(){
    var onlyGreaterThan2;
    beforeEach(function(){
      onlyGreaterThan2 = filterArray(greaterThan2);
    });
    it('should filter an array', function(){
      expect(onlyGreaterThan2([1, 3])).
        toEqual(Object.freeze([3]));
    });
    it('should filter an empty array', function(){
      expect(onlyGreaterThan2([])).
        toEqual(Object.freeze([]));
    });
    it('should reject values from an array', function(){
      expect(rejectArray(greaterThan2)([1, 3])).
        toEqual(Object.freeze([1]));
    });
  });

  describe('filterObject and rejectObject', function(){
    var onlyGreaterThan2;
    beforeEach(function(){
      onlyGreaterThan2 = filterObject(greaterThan2);
    });
    it('should filter an object', function(){
      expect(onlyGreaterThan2({x: 1, y: 3})).
        toEqual(Object.freeze({y: 3}));
    });
    it('should filter an empty object', function(){
      expect(onlyGreaterThan2({})).
        toEqual(Object.freeze({}));
    });
    it('should reject an object', function(){
      expect(rejectObject(greaterThan2)({x: 1, y: 3})).
        toEqual(Object.freeze({x: 1}));
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

  describe('reject', function(){
    it('should reject from array', function(){
      expect(reject(greaterThan2)([1, 3, 2])).toEqual(Object.freeze([1, 2]));
    });
    it('should reject from object', function(){
      expect(reject(greaterThan2)({x: 1, y: 3, z: 4})).toEqual(Object.freeze({x: 1}));
    });
    it('should reject from arguments', function(){
      expect(reject(greaterThan2)(1, 3, 2)).toEqual(Object.freeze([1, 2]));
    });
  });

  describe('reduce', function(){
    var sum;
    beforeEach(function(){
      sum = reduce(0)(add);
    });
    it('should reduce a list', function(){
      expect(sum([1, 2, 3])).toEqual(6);
    });
    it('should reduce an object', function(){
      expect(sum({x: 1, y: 3, z: 2})).toEqual(6);
    });
    it('should reduce arguments', function(){
      expect(sum(1, 2, 3)).toEqual(6);
    });
    it('should reduce empty list', function(){
      expect(sum([])).toEqual(0);
    });
    it('should reduce empty object', function(){
      expect(sum({})).toEqual(0);
    });
    it('should take initial value from array if not given an initial', function(){
      expect(reduce()(add)([1, 2, 3])).toEqual(6);
    });
    it('should take initial value from object if not given initial', function(){
      expect(reduce()(add)({x: 1, y: 3, z: 2})).toEqual(6);
    });
    it('should take initial value from arguments if not given initial', function(){
      expect(reduce()(add)(1, 2, 3)).toEqual(6);
    });
  });

  describe('all', function(){
    it('should check elements of an array', function(){
      expect(all(greaterThan2)([3, 4])).toBe(true);
      expect(all(greaterThan2)([1, 0])).toBe(false);
    });
    it('should check values of an object', function(){
      expect(all(greaterThan2)({x: 3, y: 4})).toBe(true);
      expect(all(greaterThan2)({x: 0, y: 1})).toBe(false);
    });
    it('should check all arguments', function(){
      expect(all(greaterThan2)(3, 4)).toBe(true);
      expect(all(greaterThan2)(1, 0)).toBe(false);
    });
    it('should optionally check object keys', function(){
      function singleCharKey(value, key){
        return key.length === 1;
      }
      expect(all(singleCharKey)({x: 3, y: 4})).toBe(true);
      expect(all(singleCharKey)({xy: 3, y: 4})).toBe(false);
    });
    it('should use values if not give a function', function(){
      expect(all()([true, true])).toEqual(true);
      expect(all()(true, false)).toEqual(false);
      expect(all()({x: false})).toEqual(false);
    });
  });

  describe('any', function(){
    it('should check elements of an array', function(){
      expect(any(greaterThan2)([1, 4])).toBe(true);
      expect(any(greaterThan2)([1, 0])).toBe(false);
    });
    it('should check values of an object', function(){
      expect(any(greaterThan2)({x: 1, y: 4})).toBe(true);
      expect(any(greaterThan2)({x: 0, y: 1})).toBe(false);
    });
    it('should check all arguments', function(){
      expect(any(greaterThan2)(1, 4)).toBe(true);
      expect(any(greaterThan2)(1, 0)).toBe(false);
    });
    it('should optionally check object keys', function(){
      function singleCharKey(value, key){
        return key.length === 1;
      }
      expect(any(singleCharKey)({x: 3, y: 4})).toBe(true);
      expect(any(singleCharKey)({xy: 3, cy: 4})).toBe(false);
    });
    it('should use values if not give a function', function(){
      expect(any()([true, true])).toEqual(true);
      expect(any()(true, false)).toEqual(true);
      expect(any()({x: false})).toEqual(false);
    });
  });

  describe('min', function(){
    var minLength;
    beforeEach(function(){
      minLength = min(function(item){
        return item.length;
      });
    });
    it('should return minimum using function from array', function(){
      expect(minLength(['a', 'bb'])).toEqual('a');
    });
    it('should return minimum from an array of one', function(){
      expect(minLength(['bb'])).toEqual('bb');
    });
    xit('should return minimum from an object', function(){
      expect(minLength({x: 'a', y: 'bb'})).toEqual({x: 'a'});
    });
    it('should return minimum from a selection of arguments', function(){
      expect(minLength('a', 'bb')).toEqual('a');
    });
    it('should work from values given no comparison', function(){
      expect(min()([1, 2, 3, 4])).toEqual(1);
    });
  });

  describe('max', function(){
    var maxLength;
    beforeEach(function(){
      maxLength = max(function(item){
        return item.length;
      });
    });
    it('should return maximum using function from array', function(){
      expect(maxLength(['a', 'bb'])).toEqual('bb');
    });
    it('should return maximum from an array of one', function(){
      expect(maxLength(['bb'])).toEqual('bb');
    });
    xit('should return maximum from an object', function(){
      expect(maxLength({x: 'a', y: 'bb'})).toEqual({y: 'bb'});
    });
    it('should return maximum from a selection of arguments', function(){
      expect(maxLength('a', 'bb')).toEqual('bb');
    });
    it('should work from values', function(){
      expect(max()(1, 2, 3)).toEqual(3);
    });
  });

  describe('cyclic', function(){
    it('should cyclicly fill results array', function(){
      var answer = cyclic(3)([0, 1, 2, 3, 4, 5]);
      expect(answer).toEqual([[0, 3], [1, 4], [2, 5]]);
    });
  });

  describe('not', function(){
    it('should late eval truthy statments', function(){
      lessThan2 = not(greaterThan2);
      expect(lessThan2(1)).toBe(true);
    });
  });

  describe('merge', function(){
    it('should merge an object', function(){
      var obj = {a: 1};
      var extended = merge({e: 5})(obj);
      expect(extended).toEqual({a: 1, e: 5});
    });
  });

  describe('extend', function(){
    it('should extend an object', function(){
      var a = function(a){ return true; };
      var b = {x: 5};
      extend(b)(a);
      expect(a()).toBe(true);
      expect(a.x).toEqual(5);
    });
    it('should overwrite second object', function(){
      var a = {x: 5};
      var b = {x: 7};
      extend(b)(a);
      expect(a.x).toEqual(7);
    });
  });

  describe('basic', function(){
    it('should build an object from defaults', function(){
      var basicObj = {x: 5};
      var b = {x: 7};
      basic(basicObj)(b);
      expect(basicObj.x).toEqual(7);
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

  describe('times', function(){
    it('should call a function n times', function(){
      var thrice = times(3);
      thrice(dummy);
      expect(dummy.calls.length).toEqual(3);
    });
    it('should not call the function given 0 or less', function(){
      times(0)(dummy);
      times(-1)(dummy);
      expect(dummy.calls.length).toEqual(0);
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