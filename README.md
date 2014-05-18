cuminjs
=======

[ ![Codeship Status for CrowdHailer/cuminjs](https://www.codeship.io/projects/066c6740-c0ac-0131-b9f7-220fd2f34c97/status?branch=master)](https://www.codeship.io/projects/21479)


[![Code Climate](https://codeclimate.com/github/CrowdHailer/cuminjs.png)](https://codeclimate.com/github/CrowdHailer/cuminjs)

[![Code Climate](https://codeclimate.com/github/CrowdHailer/cuminjs/coverage.png)](https://codeclimate.com/github/CrowdHailer/cuminjs)

Inspired by
underscore
score under
typclasses
preludejs
lambdajs

Core functions
useful compositions
Top namespace add comparisons
use expose to add more
majority of functions take only one argument

```js
add(3)(4)  // Vaild
add(3, 4)  // Invalid
```

use mappings instead

```js
sum = reduce(0)(add);
sum(1) // Valid
sum(1, 2, 3, 4,)
```


utilities library favouring curried functions and functional operations
