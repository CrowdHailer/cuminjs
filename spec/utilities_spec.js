describe('Cumin utility operations', function(){
  'use strict';

  describe('expose', function(){
    // forceful, as, expose defaults such as filling missing keys with 0
    it('should leave main namespace clear', function(){
      expect(function(){
        log();
      }).toThrowError("Can't find variable: log");
    });
    iit('should make functions available on top namespace', function(){
      _.expose('dot method defreeze refreeze size log equals');
      expect(function(){
        log();
      }).not.toThrow();
    });
  });

  describe('dot', function(){
    it('should pull an objects value', function(){
      var person = {name: 'Mike'};
      var name = dot('name');
      expect(name(person)).toEqual('Mike');
    });
    it('should return an array given an array', function(){
      var person = {name: 'Mike', age: 25, city: 'boston'};
      var publicDetails = dot(['name', 'city']);
      expect(publicDetails(person)).toEqual(Object.freeze(['Mike', 'boston']));
    });
    it('should return an object given an object', function(){
      var person = {name: 'Mike', age: 25, city: 'boston'};
      var greeting = dot({hello: 'name', age: 'age'});
      expect(greeting(person)).toEqual(Object.freeze({hello: 'Mike', age: 25}));
    });
  });

  describe('method', function(){
    iit('should get result of named method from and object', function(){
      var person = {getName: jasmine.createSpy().and.returnValue('Neil')};
      var name = method('getName');
      expect(name(person)).toEqual('Neil');
    });
    iit('should return undefined if there is no method', function(){
      var person = {};
      var name = method('getName');
      expect(name(person)).toEqual();
    });
  });

  describe('defreeze and refreeze', function(){
    beforeEach(function(){
      defreeze();
    });
    afterEach(function(){
      refreeze();
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
    it('should work for overlay', function(){
      expect(overlay({x: 1})({y: 2})).
        toEqual({x: 1, y: 2});
    });
  });

  describe('size', function(){
    it('should return number of elements in an array', function(){
      expect(size([1, 2])).toEqual(2);
    });
    it('should return number of values on an object', function(){
      expect(size({x: 1})).toEqual(1);
    });
  });

  describe('log', function(){
    it('should log to console', function(){
      spyOn(console, 'log');
      log(3);
      expect(console.log).toHaveBeenCalledWith(3);
    });
  });

  describe('equals', function(){
    it('should test equality for values', function(){
      var isThree = equals(3);
      expect(isThree(3)).toBe(true);
      expect(isThree(2)).toBe(false);
    });
    it('can be used as a defined test', function(){
      var a, b = 3;
      var defined = not(equals(undefined));
      expect(defined(a)).toBe(false);
      expect(defined(b)).toBe(true);
    });
  });
});