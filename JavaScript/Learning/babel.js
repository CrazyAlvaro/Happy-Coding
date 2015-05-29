"use strict";

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

