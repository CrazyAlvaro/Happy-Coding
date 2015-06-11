"use strict";

var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); }

var printf = function printf(object) {
  console.log(object);
};

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
var lineFeed = "In ES5 \"\n\" is a line-feed.";
printf(lineFeed);

// Multiple line string
//'In ES5 this is
//not legal.'

//Interpolate variable bindings
var name = "Bob",
    time = "today";
var sentence = "Hello ${name}, how are you ${time}";

printf(sentence);

/***************************** Destructuring ********************/
// list matching
var _ref = [1, 2, 3];
var a = _ref[0];
var b = _ref[2];

// object matching
//var { op: a, lhs: { op: b }, rhs: c }
//  = getASTNode()
//
//// object matching shorthand
//// binds 'op', 'lhs' and 'rhs' in scope
//var {op, lhs, rhs} = getASTNode()

// Can be used in parameter position
function g(_ref2) {
  var x = _ref2.name;

  console.log(x);
}

g({ name: 5 });

// Fail-soft descructuring
var _ref3 = [];
var a = _ref3[0];

a === undefined;

// Fail-soft desctructuring with defaults
var _ref4 = [];
var _ref4$0 = _ref4[0];
var a = _ref4$0 === undefined ? 1 : _ref4$0;

a === 1;

/***************************** Default + Rest + Spread  ********************/
function f1(x) {
  var y = arguments[1] === undefined ? 12 : arguments[1];

  // y is 12 by default
  return x + y;
}

printf(f1(3) + " should equal 15");

function f2(x) {
  for (var _len = arguments.length, y = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    y[_key - 1] = arguments[_key];
  }

  // y is an Array
  return x * y.length;
}
printf(f2(3, "hello", true, false) + " should == 9");

function f3(x, y, z) {
  return x + y + z;
}

// Pass each elem of array as argument
printf(f3.apply(undefined, [1, 2, 3]) + " should equal 6");

/***************************** Let + Const ********************/
function f4() {
  {
    var x = undefined;
    {
      // okay, block scoped name
      var _x2 = "sneaky";

      // error, const
      //x = "foo";
    }

    // error, already declared in block
    //let x = "inner";
  }
}

/***************************** Iterators + For..Of ********************/
//TODO: not understand how this works
var fibonacci = _defineProperty({}, Symbol.iterator, function () {
  var pre = 0,
      cur = 1;
  return {
    next: function next() {
      var _ref5 = [cur, pre + cur];
      pre = _ref5[0];
      cur = _ref5[1];

      return { done: false, value: cur };
    }
  };
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = fibonacci[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var n = _step.value;

    // truncate the sequence at 1000
    if (n > 1000) break;
    console.log(n);
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"]) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
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
wm.set(set, { extra: 42 });
printf(wm.size); // undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });
printf(ws.has({ data: 42 }));
// Because the added object has no other references, it will not be held in the set

/***************************** Proxies ********************/

// Proxies enable creation of objects with the full range of behaviors available to
// host objects. Can be used for interception, object virtualization, logging/profiling, etc

// Proxing a normal object
var target = {};
var handler = {
  get: function get(receiver, name) {
    return "Hello, " + name + "!";
  }
};

//var p = new Proxy(target, handler);
//p.world === "Hello, world!";
//printf(p.world);

/***************************** Subclassable Built-ins ********************/
// Array, Date, Element can be subclassed

var MyArray = (function (_Array) {
  function MyArray() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _classCallCheck(this, MyArray);

    _get(Object.getPrototypeOf(MyArray.prototype), "constructor", this).apply(this, args);
  }

  _inherits(MyArray, _Array);

  return MyArray;
})(Array);

var arr = new MyArray();
arr[0] = 10;
arr[1] = 12;
printf("MyArray length:" + arr.length);

