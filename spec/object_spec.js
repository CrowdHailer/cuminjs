describe('Object only operations', function(){
  'use strict';

  var dummy, obj;
  beforeEach(function () {
    dummy = jasmine.createSpy();
    obj = {};
  });

  _.expose('eachObject mapObject filterObject rejectObject extend augment foundation overlay select omit');


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
    it('should maintain context when calling an object', function () {
      eachObject(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
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
    it('should maintain context when mapping an object', function () {
      mapObject(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
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
    it('should maintain context when filtering an object', function () {
      filterObject(dummy).call(obj, {x: 4, y: 2});
      expect(dummy.calls.mostRecent().object).toBe(obj);
    });
    it('should reject an object', function(){
      expect(rejectObject(greaterThan2)({x: 1, y: 3})).
        toEqual(Object.freeze({x: 1}));
    });
  });

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
    it('should return the extended object', function(){
      var obj = {x: 1};
      expect(extend({x: 2})(obj)).toBe(obj);
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
      expect(augment(obj)({x: 2})).toBe(obj);
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
      expect(clone(a)).not.toBe(a);
    });
  });

  describe('overlay', function(){
    var overlays;
    beforeEach(function(){
      overlays = overlay({x: 1});
    });
    it('should add key value pairs to passed object object', function(){
      expect(overlays({y: 2})).toEqual(Object.freeze({x: 1, y: 2}));
    });
    it('should overwrite keys in the passed object', function(){
      expect(overlays({x: 2})).toEqual(Object.freeze({x: 1}));
    });
    it('should return the overlay object if given no futher keys', function(){
      expect(overlays()).toEqual(Object.freeze({x: 1}));
    });
    it('should work as clone given no initial', function(){
      var clone = overlay();
      var a = {x: 5};
      expect(clone(a)).toEqual(Object.freeze({x: 5}));
      expect(clone(a)).not.toBe(a);
    });
  });
});