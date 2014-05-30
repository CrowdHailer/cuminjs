describe('Object only operations', function(){
  _.expose('extend augment foundation');

  describe('extend', function(){
    // augment attachemts
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

  describe('augment', function(){
    // attach, append
    it('should add key value pairs to object', function(){
      var obj = {x: 1};
      augment(obj)({y: 2});
      expect(obj).toEqual({x: 1, y: 2});
    });
    it('should overwrite existing values on the passed object', function(){
      var obj = {x: 1, y: 2};
      augment(obj)({x: 2});
      expect(obj).toEqual({x: 2, y: 2});
    });
    it('should return the augmented object', function(){
      var obj = {x: 1};
      expect(_.augment(obj)({x: 2})).toBe(obj);
    });
  });

  describe('foundation', function(){
    var initialObj;
    beforeEach(function(){
      initialObj = foundation({x: 1});
    });
    it('should add key value pairs to foundation object', function(){
      expect(initialObj({y: 2})).toEqual(Object.freeze({x: 1, y: 2}));
    });
    it('should overwrite keys in the foundation object', function(){
      expect(initialObj({x: 2})).toEqual(Object.freeze({x: 2}));
    });
    it('should return the initial object if given no futher keys', function(){
      expect(initialObj()).toEqual(Object.freeze({x: 1}));
    });
    it('should work as clone given no initial', function(){
      var clone = foundation();
      var a = {x: 5};
      expect(clone(a)).toEqual(Object.freeze({x: 5}));
      expect(clone(a)).not.toEqual(a);
    });
  });
});