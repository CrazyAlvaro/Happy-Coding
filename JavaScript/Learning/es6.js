"use strict"

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
var fibonacci = {
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
//var fibonacci = {
//  [Symbol.iterator]: function*() {
//    var pre = 0, cur = 1;
//    for (;;) {
//      var temp = pre;
//      pre = cur;
//      cur += temp;
//      yield cur;
//    }
//  }
//}
//
//for (var n of fibonacci) {
//  // truncate the sequence at 1000
//  if (n > 1000)
//    break;
//  console.log(n);
//}


/***************************** Comprehensions ********************/

var customers = ["Seattle", "Washington", "San Francisco"];
// Array comprehensions
//var results = [
//  for(c of customers)
//    if (c.city == "Seattle")
//      { name: c.name, age: c.age }
//]
//
//// Generator comprehensions
//var result = {
//  for(c of customers)
//    if (c.city == "Seattle")
//      { name: c.name, age: c.age }
//}

/***************************** Modules ********************/


/***************************** Map + Set + WeakMap + WeakSet ********************/
var set = new Set();
set.add("hello").add("goodbye").add("hello");
printf(set.size);
printf(set.has("hello"));

// Maps
var map = new Map();
map.set("hello", 42);
map.set(set, 34);
printf(map.get(set));

// Weak Maps
var wm = new WeakMap();
wm.set(set, {extra: 42});
printf(wm.size);    // undefined

// Weak Sets
var ws = new WeakSet();
ws.add({data: 42});
printf(ws.has({data: 42}));
// Because the added object has no other references, it will not be held in the set


/***************************** Proxies ********************/

// Proxies enable creation of objects with the full range of behaviors available to
// host objects. Can be used for interception, object virtualization, logging/profiling, etc

// Proxing a normal object
var target = {};
var handler = {
  get: function(receiver, name) {
    return `Hello, ${name}!`;
  }
};

//var p = new Proxy(target, handler);
//p.world === "Hello, world!";
//printf(p.world);


/***************************** Subclassable Built-ins ********************/
// Array, Date, Element can be subclassed
class MyArray extends Array {
  constructor(...args) { super(...args); }
}

var arr = new MyArray();
arr[0] = 10;
arr[1] = 12;
printf("MyArray length:" + arr.length);


/***************************** Math + Number + String + Object APIs ********************/


/***************************** Promises ********************/
// Library for asynchronous programming

function timeout(duration = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration);
  })
}

var promise = timeout(1000).then(() => {
  return timeout(2000);
}).then(() => {
  throw new Error("hmm");
}).catch(err => {
  return Promise.all([timeout(100), timeout(200)]);
})


// Promise
// The Promise object is used for deferred and asynchronous computations.
// A promise is in one of these states:

// STATE
// pending:   initial state, not fulfilled or rejected
// fulfilled: successful operation
// rejected:  failed operation
// settled: the Promise is either fulfilled or rejected, but not pending

// Syntax
// new Promise(executor);
// new Promise(function(resolve, reject) { ... });
//
// Parameters
//
// executor
//  Function object with two arguments resolve and reject. The first argument
//  fulfills the promise, the second argument rejects it. We can call these functions
//  once our operation is completed.

//constructor takes one argument, a callback with two parameters, resolve and reject
//
//"then" taks two arguments, a callback for a success case, and another for the failure case.
//(both are optional)


