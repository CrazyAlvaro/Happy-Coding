var printf = function(object) {
  console.log(object);
}

/***************************** Enhanced Object Literals ********************/
//var obj = {
//  // __proto__
//  __proto__: thePtotoObj,
//
//  // Shorthand for 'handler: handler'
//  handler,
//
//  // Methods
//  toString() {
//    // Super calls
//    return "d " + super.ToString();
//  },
//
//  // Compuited (dynamic) property names
//  [ "prop_" + (() => 42)() ]: 42
//};

/***************************** Template Strings ********************/
var lineFeed = 'In ES5 "\n" is a line-feed.'
printf(lineFeed);

// Multiple line string
//'In ES5 this is
//not legal.'

//Interpolate variable bindings
var name = "Bob", time = "today";
var sentence = 'Hello ${name}, how are you ${time}';

printf(sentence);

/***************************** Destructuring ********************/
// list matching
var [a, , b] = [1, 2, 3];

// object matching
//var { op: a, lhs: { op: b }, rhs: c }
//  = getASTNode()
//
//// object matching shorthand
//// binds 'op', 'lhs' and 'rhs' in scope
//var {op, lhs, rhs} = getASTNode()

// Can be used in parameter position
function g({name: x}) {
  console.log(x);
}

g({name: 5})

// Fail-soft descructuring
var [a] = [];
a === undefined;

// Fail-soft desctructuring with defaults
var [a = 1] = [];
a === 1;

/***************************** Default + Rest + Spread  ********************/
function f1(x, y=12) {
  // y is 12 by default
  return x + y;
}

printf(f1(3) + " should equal 15")

function f2(x, ...y) {
  // y is an Array
  return x * y.length;
}
printf(f2(3, "hello", true, false) + " should == 9");

function f3(x, y, z) {
  return x + y + z;
}

// Pass each elem of array as argument
printf(f3(...[1, 2, 3]) + " should equal 6");

/***************************** Let + Const ********************/
function f4() {
  {
    let x;
    {
      // okay, block scoped name
      const x = "sneaky";

      // error, const
      //x = "foo";
    }

    // error, already declared in block
    //let x = "inner";
  }
}

/***************************** Iterators + For..Of ********************/
//TODO: not understand how this works
let fibonacci = {
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}

// include Babel polyfill to use Iterators

//interface IteratorResult {
//  done: boolean;
//  value: any;
//}
//
//interface Iterator {
//  next(): IteratorResult;
//}
//
//interface Iterable {
//  [Symbol.iterator](): Iterator
//}

/***************************** Generators ********************/
//TODO: again no idea
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

for (var n of fibonacci) {
  // truncate the sequence at 1000
  if (n > 1000)
    break;
  console.log(n);
}


/***************************** Comprehensions ********************/

// Array comprehensions
var results = [
  for(c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
]

// Generator comprehensions
var result = {
  for(c of customers)
    if (c.city == "Seattle")
      { name: c.name, age: c.age }
}

/***************************** Modules ********************/

/***************************** Map + Set + WeakMap + WeakSet ********************/









