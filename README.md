cumin.js
=======
##### A library adding functional programming utilities to Javascript

[ ![Codeship Status for CrowdHailer/cuminjs](https://www.codeship.io/projects/066c6740-c0ac-0131-b9f7-220fd2f34c97/status?branch=master)](https://www.codeship.io/projects/21479)
[![Code Climate](https://codeclimate.com/github/CrowdHailer/cuminjs.png)](https://codeclimate.com/github/CrowdHailer/cuminjs)
[![Code Climate](https://codeclimate.com/github/CrowdHailer/cuminjs/coverage.png)](https://codeclimate.com/github/CrowdHailer/cuminjs)

### Collections
**eachArray** `_.eachArray(operation)(array)`  
Iterates over an array of elements, with increasing index, from index 0 to length-1. The operation is called for each element with two arguments `(element, index)`

**eachArrayRight** `_.eachArrayRight(operation)(array)`  
Iterates over an array of elements, with decreasing index, from index length-1 to 0. The operation is called for each element with two arguments `(element, index)` *This is the reverse operation to eachArray*

**eachObj** `_.eachObject(operation)(object)`  
Iterates through all key value pairs on an object. The operation is called for each pair with two arguments `(value, key)`

**each** `_.each(operation)(object)`  
Iterates through a collection (array, object, arguments). No order is guarenteed. The operations is called for each item with two arguments `(item, location)`

**mapArray** `_.mapArray(operation)(array)`
Maps each element in an array to an element in new array. New values are the return of operation. Operation is called each time with arguments `(element, index)`. By default the return array is frozen.

**mapObject** `_.mapObject(operation)(object)`
Maps each value in an object to the same key in a new object. New values are the return of operation. Operation is called each time with arguments `(value, key)`. By default the return object is frozen.

**map** `_.map(operation)(collection)`
Maps items in a collection (array, object, arguments) to a new collection. The returned collection is frozen by default. If given an object map will return an object. If given an array or multiple arguments map will return an array.

**Note on maps**
Map may not behave as expected if using cumin.js after other libraries, notably underscore.js. See examples.

```js
function plus1 (number) {
  return number + 1;
}

// cumin.js
var incrementItems = map(plus1)

incrementItems([1, 2])
=> [2, 3]

incrementItems({a: 1, b: 2})
=> {a: 2, b: 3}

incrementItems(1, 2)
=> [2, 3]

// underscore.js
_.map([1, 2], plus1)
=> [2, 3]

_.map({a: 1, b: 2}, plus1)
=> [2, 3]
```

**filterArray** `_.filterArray(operation)(array)`
Adds each element to a new array on condition operation returns true. Operation is called each time with arguments `(element, index)`. By default the return array is frozen.

**filterObject** `_.filterObject(operation)(object)`
Adds each value to a new object on condition operation returns true. Operation is called each time with arguments `(value, key)`. By default the return object is frozen.

**filter** `_.filter(operation)(collection)`
Adds each item to a new collection on condition operation returns true. The returned collection is frozen by default. If given an object map will return an object. If given an array or multiple arguments map will return an array.

**rejectArray, rejectObject, reject**
Same behaviour as filter functions except adds items when condition returns false.


- **reduce**

- **all**
- **any**
- **min**
- **max**

### Notes
##### Curried function
*Most* functions are curried and take a single argument. e.g.
```js
// reduce(initial)(operand)(collection)

sum = reduce(0)(add);
sum(1) 
\> 1
sum(1, 2, 3, 4,)
\> 10
```
Functions that are passed as operand are also expected to take arguments singly. e.g.
```js
add(3)(4)  // Vaild
add(3, 4)  // Invalid
```

*Exception* functions such as map, reduce, filter pass index/key as second argument with element/value

##### Typecheck functions
These are added to the top namespace and include the following:-
- argsToList
- isArray
- isObj

##### Expose
All functions are kept on the underscore '_' namespace. The expose function takes a space separated string listing functions to add to top level. e.g.

```js
_.map() // valid
map() // invalid

_.expose('map dot')
map() // valid
dot() // valid
```

### Future possibilities
Needs clarification on context
include breaker;

### Inspired by
- [underscore.js](http://underscorejs.org/)
- [score under](https://github.com/loop-recur/scoreunder)
- [typclasses](https://github.com/loop-recur/typeclasses)
- [preludejs](https://github.com/loop-recur/PreludeJS)
- [lambdajs](https://github.com/loop-recur/lambdajs)

