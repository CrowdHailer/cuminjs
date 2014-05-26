describe('compositions', function(){
  describe('expose', function(){
    it('should leave main namespace clear', function(){
      expect(function(){
        limit();
      }).toThrow("Can't find variable: limit");
    });
    it('should make functions available on top namespace', function(){
      _.expose('weed limit every pluck '
              );
      expect(function(){
        limit();
        weed();
      }).not.toThrow();
    });
  });

  describe('limit by keys', function(){
    var obj;
    beforeEach(function(){
      obj = {a: 1, b: 2, c: 3};
    });
    it('should restrict on keys', function(){
      var limited = limit('a')(obj);
      expect(limited).toEqual(Object.freeze({a: 1}));
    });
    it('should restrict on multiple keys', function(){
      var limited = limit('a', 'b')(obj);
      expect(limited).toEqual(Object.freeze({a: 1, b: 2}));
    });
    it('should not add values not on original', function(){
      var limited = limit('a', 'd')(obj);
      expect(limited).toEqual(Object.freeze({a: 1}));
    });
  });

  describe('weed by keys', function(){
    var obj;
    beforeEach(function(){
      obj = {a: 1, b: 2, c: 3};
    });
    it('should restrict on keys', function(){
      var weeded = weed('a')(obj);
      expect(weeded).toEqual(Object.freeze({b: 2, c: 3}));
    });
    it('should restrict on multiple keys', function(){
      var weeded = weed('a', 'b')(obj);
      expect(weeded).toEqual(Object.freeze({c: 3}));
    });
    it('should not add values not on original', function(){
      var weeded = weed('a', 'd')(obj);
      expect(weeded).toEqual(Object.freeze({b: 2, c: 3}));
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