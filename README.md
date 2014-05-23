cumin.js
=======
##### A library adding functional programming utilities to Javascript

[ ![Codeship Status for CrowdHailer/cuminjs](https://www.codeship.io/projects/066c6740-c0ac-0131-b9f7-220fd2f34c97/status?branch=master)](https://www.codeship.io/projects/21479)
[![Code Climate](https://codeclimate.com/github/CrowdHailer/cuminjs.png)](https://codeclimate.com/github/CrowdHailer/cuminjs)
[![Code Climate](https://codeclimate.com/github/CrowdHailer/cuminjs/coverage.png)](https://codeclimate.com/github/CrowdHailer/cuminjs)

### Core functions
**eachArr** `_.eachArr(operation)(array)`  
Iterates over an array of elements, with increasing index, from index 0 to length-1. The operation is called for each element with two arguments `(element, index)`

**eachArrRight** `_.eachArrRight(operation)(array)`  
Iterates over an array of elements, with decreasing index, from index length-1 to 0. The operation is called for each element with two arguments `(element, index)` *This is the reverse operation to eachArr*

- **eachObj**
- **each**

- **map**
- **filter**
- **reject**
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

### Inspired by
- [underscore.js](http://underscorejs.org/)
- [score under](https://github.com/loop-recur/scoreunder)
- [typclasses](https://github.com/loop-recur/typeclasses)
- [preludejs](https://github.com/loop-recur/PreludeJS)
- [lambdajs](https://github.com/loop-recur/lambdajs)

