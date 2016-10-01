
<!--#echo json="package.json" key="name" underline="=" -->
arraynge
========
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Various transforms for ranges of array/list indices.
<!--/#echo -->


Usage
-----
see [test/usage.js](test/usage.js)


API
---

### Import it
```javascript
var arraynge = require('arraynge');
```

### Create arraynges
```javascript
range = arraynge();
range = arraynge(from, upto);           // range includes both values
range = arraynge(from, upto, list);

makeRangeFromList = arraynge.withThisList.bind(list);
range = makeRangeFromList(from, upto);

list.makeRange = arraynge.withThisList;
range = list.makeRange(from, upto);
```

### Configure an arraynge
The config functions return the arraynge they were called on,
so you can chain them.

```javascript
range.bounds(newFirstIndex, newLastIndex);
range.from(newFirstIndex);
range.upto(newLastIndex);
range.list(null || false);  // forget current list
range.list(someObject);     // set new list
range.list(someNumber);     // set list to array-like object { length: number }
```

### Query the config
```javascript
range.toString();   // -> (string) description
range.bounds();     // -> (array) [from, upto]
range.from();       // -> (any) from
range.upto();       // -> (any) upto
range.list();       // -> (object | false) list
range.len();        // -> (number) list.length or 0
```

### Modify the bounds
Parameter `max` or `len` is optional. If provided, it should be a number.
(Maximum valid integer index for your list, or the list's length.)
If not provided or `undefined`, it is calculated from `.len()`.

```javascript
range.trueMax(max);   // index === true? set to max.
range.warpZero(len);  // index negative? += len. still neg? set to false.
range.modulo(len);    // warp indices into range [0 <= x < len]
range.confine(max);   // index negative? set to 0. too large? set to max.

range.validateBounds(max);    // negative or too large? set to false.

range.translate(bothDist);            // add same offset to both
range.translate(fromDist, lastDist);  // add offsets to each
```

### Cautious transforms
  * They won't modify the config.
  * If any of the bounds is not a finite number, or is out of range,
    the cautious transforms will abort without any action or
    side effect and will return `false`.
  * Parameters `len` or `max` optional as above.

```javascript
range.boundsIfValid(max);   // array [from, upto]
range.enumerate();    // array of numbers {from <= x <= upto}, step size = 1
range.map(iter);      // numbers like .enumerate but collect iter(list[x], x)
```





<!--#toc stop="scan" -->


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
