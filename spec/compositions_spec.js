describe('compositions', function(){
  describe('expose', function(){
    it('should leave main namespace clear', function(){
      expect(function(){
        pluck();
      }).toThrowError("Can't find variable: pluck");
    });
    it('should make functions available on top namespace', function(){
      _.expose('every pluck pick omit cyclic');
      expect(function(){
        pick();
        omit();
      }).not.toThrow();
    });
  });

  describe('pick by keys', function(){
    var obj;
    beforeEach(function(){
      obj = {a: 1, b: 2, c: 3};
    });
    it('should restrict on keys', function(){
      var picked = pick(['a'])(obj);
      expect(picked).toEqual(Object.freeze({a: 1}));
    });
    it('should restrict on multiple keys', function(){
      var picked = pick(['a', 'b'])(obj);
      expect(picked).toEqual(Object.freeze({a: 1, b: 2}));
    });
    it('should restrict on multiple argument keys', function(){
      var picked = pick('a', 'b')(obj);
      expect(picked).toEqual(Object.freeze({a: 1, b: 2}));
    });
    it('should not add values not on original', function(){
      var picked = pick(['a', 'd'])(obj);
      expect(picked).toEqual(Object.freeze({a: 1}));
    });
  });

  describe('omit by keys', function(){
    var obj;
    beforeEach(function(){
      obj = {a: 1, b: 2, c: 3};
    });
    it('should restrict on keys', function(){
      var omitted = omit(['a'])(obj);
      expect(omitted).toEqual(Object.freeze({b: 2, c: 3}));
    });
    it('should restrict on multiple keys', function(){
      var omitted = omit(['a', 'b'])(obj);
      expect(omitted).toEqual(Object.freeze({c: 3}));
    });
    it('should restrict on multiple argument keys', function(){
      var omitted = omit('a', 'b')(obj);
      expect(omitted).toEqual(Object.freeze({c: 3}));
    });
    it('should not add values not on original', function(){
      var omitted = omit(['a', 'd'])(obj);
      expect(omitted).toEqual(Object.freeze({b: 2, c: 3}));
    });
  });

  describe('pluck', function(){
    it('should selectivly flatten array', function(){
      var array = [{a: 1}, {a: 3}, {a: 2}];
      expect(pluck('a')(array)).toEqual(Object.freeze([1, 3, 2]));
    });
  });

  describe('every third', function(){
    it('should return every third element in array', function(){
      var everythird = compose(dot(0), cyclic(3));
      expect(everythird([0, 1, 2, 3, 4, 5, 6, 7])).
        toEqual([0, 3, 6]);
    });
  });

  xdescribe('every', function(){
    // TODO solve this one as compositions
    it('should check if every satisfy condition', function(){
      expect(every([true, true])).toEqual(true);
      expect(every([true, false])).toEqual(false);
    });
    it('should be possible to make every statement', function(){
      function modulo(denominator){
        return function(number){
          return number % denominator;
        };
      }
      var divisiblyBy2 = not(modulo(2));
      var action = compose(reduce(true)(_.and), map(divisiblyBy2)) ;
      expect(action([2, 4, 6])).toEqual(true);
    });
  });
});