describe('Cumin array operations', function(){
  'use strict';

  var dummy;
  beforeEach(function(){
    dummy = jasmine.createSpy();
  });

  _.expose('eachArray cleave cyclic within');

  ddescribe('eachArray', function(){
    it('should call the function with every element and corresponding index', function(){
      eachArray(dummy)([4, 2]);
      expect(dummy.calls.allArgs()).toEqual([[4, 0], [2, 1]]);
    });
    it('should not call the function when passed an empty array', function(){
      eachArray(dummy)([]);
      expect(dummy).not.toHaveBeenCalled();
    });
  });

  describe('cleave', function(){
    it('should split an array', function(){
      expect(cleave(2)([0, 1, 2, 3, 4]))
        .toEqual([[0, 1], [2, 3, 4]]);
    });
    it('should split an array with arument 0', function(){
      expect(cleave(0)([0, 1]))
        .toEqual([[], [0, 1]]);
    });
    it('should work with negative arguments', function(){
      expect(cleave(-2)([0, 1, 2, 3, 4]))
        .toEqual([[0, 1, 2], [3, 4]]);
    });
  });

  describe('cyclic', function(){
    it('should cyclicly fill results array', function(){
      var answer = cyclic(3)([0, 1, 2, 3, 4, 5]);
      expect(answer).toEqual([[0, 3], [1, 4], [2, 5]]);
    });
    it('should have empty arrays it array shorter than division', function(){
      var answer = cyclic(3)([1]);
      expect(answer).toEqual([[1], [], []]);
    });
  });

  describe('within', function(){
    // could return object {value: true/false, location: first occurance}
    it('return true if test element is in  array', function(){
      var withinRange = within([2, 3, 4]);
      expect(withinRange(2)).toBe(true);
      expect(withinRange(1)).toBe(false);
    });
    it('should work with multi arguments', function (){
      var withinRange = within(2, 3, 4);
      expect(withinRange(4)).toBe(true);
      expect(withinRange(1)).toBe(false);
    });
  });

  describe('includes', function(){
    it('can be composed from primatives', function(){
      var includes = compose(any, equals);
      var includes2 = includes(2);
      // LARGE ISSUE WITH ANY ALL MEMORY BETWEEN RUNS
      expect(includes2([1,3])).toBe(false);
      expect(includes2([1,2,3])).toBe(true);
    });
  });
});