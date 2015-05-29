/*
 * method function:
 *
 * All native functions in JavaScript inherit from Function.prototype.
 * Number, String, Object, Array and RegExp are all functions.
 * Therefore they inherit from Function.prototype
 *
 * 'method' is intended to be called on constructor functions. It's job
 * is to make the function you supply to it into a method that exists for every
 * object created by the constructor function on which you called method.
 *
 */

Function.prototype.method = function (name, func) {
  this.prototype[name] = func;    // 'this' is a reference to the object on which the method was called.
  return this;
};

// printf wrapper of document.writeln
var printf = function(str) {
  document.writeln(str);
}
//document.writeln('Hello, world');

printf("\n/******************** CHAPTER 5 Inheritance ********************/\n");

function simpleCall(){
  //"use strict";
  console.log(this);  // this undefined
}

simpleCall();

/*****************************************
 *
 * Closure
 *
 *****************************************/

printf("\n==================== Closure ====================\n");
/*
// Fade example
var fade = function (node) {
  var level = 1;
  var step = function(){
    var hex = level.toString(16);
    node.style.backgroundColor = '#FFFF' + hex + hex;
    if(level < 15){
      level += 1;
      setTimeout(step,300);
    }
  };
  setTimeout(step,300);
};

fade(document.body);
*/

// BAD EXAMPLE
var add_the_handlers = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1){
    nodes[i].onclick = function(e){
      alert(i);
    };
  }
};

// Since inner function has access to the actual variable of the outer function
// and not copies, alert will always show the number of nodes instead of the value
// of i at the time it was made

// END BAD EXAMPLE

// BETTER EXAMPLE

var add_the_handlers = function (nodes) {
  var helper = function (i) {
    return function (e) {
      // because the i is bound to the context, it will always be the original value
      alert(i);
    };
  };

  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = helper(i);
  }
};

// END BETTER EXAMPLE

/*****************************************
 *
 *  Module
 *
 *****************************************/

printf("\n==================== Module ====================\n");

String.method("deentityify", function(){
  // The entity table. It maps entity names to characters

  var entity = {
    quot: '"',
    lt:   '<',
    gt:   '>'
  };

  // REturn the deentityify method.

  return function () {

    return this.replace(/&([^&;]+);/g,
      function (a, b) {   // a is matching substring, b is matching part inside ( )
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}()); // Invoke function immediately

document.writeln(
  "&lt;&quot;&gt;".deentityify());  // <">

// Serial number maker
var serial_maker = function () {
  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function (p) {
      prefix = String(p);
    },
    set_seq: function (s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();  // unique is "Q1000"
document.writeln(unique);

/*****************************************
 *
 *  Curry: produce a new function by combining a function and an argument
 *
 *****************************************/

printf("\n==================== Curry ====================\n");
// var add1 = add.curry(1);
// document.writeln(add1(5));  // 6

Function.method('curry', function () {
  var args = arguments, that = this;
  return function () {
    return that.apply(null, args.concat(arguments));
  };
}); // something isn't right arguments is not an array

Function.method('curry', function () {
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function () {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

/*****************************************
 *
 *  Memoization
 *
 *****************************************/

printf("\n==================== Memoization ====================\n");
// compute fibonacci numbers, other then use recursive call, storing numbers has been computed
document.writeln("Computing Fibonacci Numbers");

// recursive way
var fibonacci = function (n) {
  return n < 2 ? n : fibonacci(n-1) + fibonacci(n-2);
};

// my code
// var fibonacci = function (n) {
//   var numbers = [1,2];  // array to store numbers
//   var fab = function(numbers, n) {
//     num = typeof numbers[n] === number ? numbers[n] : fab(numbers, n-1) + fab(numbers, n-2);
//     numbers[n] = num;
//   };
//   fab(numbers, n);
// };

//memoization way, also hide memo in a closure
var fibonacci = (function () {
  var memo = [0,1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}());


// Generalize this Memoization
var memoizer = function (memo, formula) {
  var recur = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

// Fabonacci number
var fibonacci = memoizer([0,1], function (recur, n) {
  return recur(n - 1) + recur(n - 2);
});


for (var i = 0; i <= 4; i += 1) {
  document.writeln('//' + i + ': ' + fibonacci(i));
}

var factorial = memoizer([1,1], function (recur, n) {
    return n * recur(n - 1);
});


/*****************************************
 *
 *  Method
 *
 *****************************************/

// Array reduce
//  The reduce() method applies a function against an accumulator and each value of the array

printf("\n==================== Array.reduce()====================\n");
// for loop to compute the sum of an array
var total = 0;
var numbers = [1, 5, 7, 3, 8, 9];
for ( var i = 0; i < numbers.length; i++ ){
  total += numbers[i];
}

document.writeln("\nTotal value using for loop is:" + total);

// using reduce method:
// callback( previousValue(last invocation of the callback), currentValue, index, array )
var sum = numbers.reduce( function(total, num){ return total + num }, 0); // 0 is initial value, optional
document.writeln("\nTotal value using reduce method is:" + sum);


// for loop concat an array of string
var message = "";
var words = ["reducing", "is", "simple"];
for ( var i = 0; i < words.length; i++ ){
  message += words[i];
}
document.writeln("\nMessage using for loop is:" + message);

var line = words.reduce( function(build_line, word) { return build_line + word; } );
document.writeln("\nMessage using reduce is:" + line);

// Faltten an array of arrays
var flattened = [[0, 1], [2, 3], [4, 5]].reduce( function(previousValue, currentValue) {
  return previousValue.concat(currentValue);    // using array concat method
});
document.writeln("\nFlatten array is:" + flattened);

/***************************************************
 * method: map
 * Description: creates a new array with the results of calling a provided function on every element in this array
 * array.map(callback[, thisArg])
 * Parameters: callback( currentValues, index, array)
 ***************************************************/

printf("\n==================== Array.map()====================\n");
// Example: mapping an array of numbers to an array of square roots
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
document.writeln("\nnumbers are:" + numbers + " roots of numbers are:" + roots);

// Example: reformat objects in an array
var kvArray = [{key:1, value:10}, {key:2, value:20}, {key:3, value: 30}];
var reformattedArray = kvArray.map(function(obj) {
  var rObj = {};
  rObj[obj.key] = obj.value;
  return rObj;
});

document.writeln("\n print object \n kvArray are:" +
    JSON.stringify(kvArray) + "\n reformattedArray are:" + JSON.stringify(reformattedArray));

// Example: reverse a string using map
var str = '123456';
var values = [].map.call(str, function(x) {     /* TODO: understand why call bind str as this to map function */
  return x;
}).reverse().join('');
document.writeln("\n reverse str of: " + str + " is: " + values);

var numberArray = ['1', '2', '3'];
var result = numberArray.map(parseInt);
// actual result is [1, NaN, NaN]
// Array.prototype.map passes 3 arguments:
// the element, the index, the array
// The third argument is ignored by parseInt, but not the second one,
// hence the possible confusion.
document.writeln("\n result of parseInt of " + numberArray + " is: " + result);

function returnInt(element) {
  return parseInt(element, 10);
}
var result = numberArray.map(returnInt);
document.writeln("\n result of parseInt of " + numberArray + " is: " + result);

// implementation of the map function

if(Array.prototype.map) {

  Array.prototype.map = function(callback, thisArg) {

//    //  check thisArg is typeof Array
//    if(thisArg.isArray) {
//      throw("type error");
//    }
//
//    //  for each element, call callback, concat with new array, return
//    var result = [];
//    for( var i = 0; i < thisArg.length; i++ ) {
//      result.concat( callback(thisArg[i], i, thisArg) )
//    }
//    return result

    var thisValue, newArray, index;

    if(this == null) {    //different between '==' and '===': loos equality, not check type, strict equality
      throw new TypeError(' this is null or not defined');
    }

    var arrayObject = Object(this);

    var len = arrayObject.length >>> 0;   // zero-fill right shift, shift in zeros from the left

    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    if (arguments.length > 1) {
      thisValue = thisArg;
    }

    newArray = new Array(len);    // create a new array with size len

    index = 0;

    while (index < len) {
      var kValue, mappedValue;

      if (index in arrayObject) {
        kValue = arrayObject[index];
        // callback function accepts currentValue, index, array
        mappedValue = callback.call(thisValue, kValue, index, arrayObject);

        newArray[index] = mappedValue;
      }
      index++;
    }

    return newArray;
  }
}

// or just do this, test
console.log(numberArray.map(Number));

/***************************************************
 * method: filter
 * creates a new array with all elements that pass the test implemented by the provided function
 * array.filter(callback[, thisArg])
 ***************************************************/

printf("\n==================== Array.filter()====================\n");
// example: filtering out all small values
function isBigEnough(value) {
  return value >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

// Filtering invalid entries from JSON
var arr = [
  { id: 15 },
  { id: -1},
  { id: 0},
  { id: 12.2},
  { },
  { id: null },
  { id: NaN },
  { id: 'undefined' }
];

var invalidEntries = 0;

function filterByID(obj) {
  if ('id' in obj && typeof(obj.id) === 'number' && !isNaN(obj.id)) {
    return true;
  } else {
    invalidEntries++;
    return false;
  }
}

var arrByID = arr.filter(filterByID)    // pass a filter callback function to filter the array elments
document.writeln("\n" + JSON.stringify(arrByID));

/***************************************************
 * method: some
 * Tests some element in the array passes the test implemented by the provided function
 * array.some(callback[, thisArg])
 ***************************************************/

printf("\n==================== Array.some()====================\n");
// example: Testing value of array elements
function isBiggerThan10(element, index, array) {
  return element > 10;
}
var tArray1 =[2, 5, 8, 1, 4];
var tArray2 =[12, 5, 8, 1, 4];
document.writeln("[" + tArray1.toString() + "].some(isBiggerThan10) " + tArray1.some(isBiggerThan10));
document.writeln("[" + tArray2.toString() + "].some(isBiggerThan10) " + tArray2.some(isBiggerThan10));


/***************************************************
 * method: every
 * Tests whether all elements in the array pass the test implemented by the provided function
 * array.every(callback[, thisArg])
 ***************************************************/
printf("\n==================== Array.every()====================\n");
function isBigEnough(element, index, array) {
  return element >= 10;
}

var array1 = [12, 54, 18, 130,44];
document.writeln(array1.every(isBigEnough));

// or using arrow functions
//document.writeln(array1.every(elem => elem >= 10)); // not support by chrome yet

/***************************************************
 * JSON
 * method: stringify
 * converts a JavsScript value to a JSON string, optionally
 * replacing values if a replacer function is specified,
 * or optionally including only the specified properties
 * if a replacer array is specified.
 *
 * JSON.stringify(value[, replacer[, space]])
 ***************************************************/

printf("\n==================== JSON.stringify()====================\n");
printf("{}" + JSON.stringify({}));

// replacer example
var foo = {foundation: "Mozilla", model: "box", week: 45, transport: "car", month: 7};
printf(JSON.stringify(foo));

function replacerString(key, value) {
  if (typeof value === "string") {
    return undefined;   // discard value type if string
  }
  return value;
}

printf(JSON.stringify(foo, replacerString));

// example with an array
printf(JSON.stringify(foo, ['week', 'month']));   // only keep 'week', 'month' properties

// using ' or ", another as literal
printf("Say 'Hello'");
printf('Say "Hello"');

printf(JSON.stringify({a: 2}));
printf(JSON.stringify({a: 2}, null, ' '));

printf(JSON.stringify({uno: 1, dos: 2}));
printf(JSON.stringify({uno: 1, dos: 2}, null, ' '));


// toJSON() behavior
var obj = {
  foo: 'foo',
  toJSON: function() {    // only the invocation of this function will be serialized
    return 'bar';
  }
};
printf(JSON.stringify(obj));
printf(JSON.stringify({x: obj}));

/***************************************************
 * JSON
 * method: parse
 * parses a string as JSON, optionally transforming
 * the value produced by parsing
 ***************************************************/
printf("\n==================== JSON.parse()====================\n");
printf(JSON.parse('{}'));
printf(JSON.parse('[1, 5, "false"]'));

/***************************************************
 * method: bind
 * creates a new function that, when called, has its this keyword
 * set to the provided value, with a given sequence of arguments
 * preceding any provided when the new function is called.
 * fun.bind(thisArg[, arg1[, arg2[, ...]]])
 ***************************************************/
printf("\n==================== bind()====================\n");

// Example: creating a bound function
var x = 9;
var module = {
  x: 91,
  getX: function() { return this.x; }
};

printf(module.getX());

var getX = module.getX;
//printf(getX()); // 9, because a new function with 'this' bound to module

var boundGetX = getX.bind(module);
printf(boundGetX());

/***************************************************
 * method: call
 * Calls a function with a given 'this' value and arguments
 * provided individually.
 * fun.call(thisArg[, arg1[, arg2[, ...]]])
 ***************************************************/
printf("\n==================== call()====================\n");
// Example: Using call to chain constructors for an object

function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError('Cannot create product ' +
                      this.name + ' with a negative price');
  }

  return this;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

Food.prototype = Object.create(Product.prototype);    //TODO: what fun.prototype means ?

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

Toy.prototype = Object.create(Product.prototype);

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);


// Example: Using call to invoke an anonymous function TODO: use reduce function other than for
var animals = [
  { species: 'Lion', name: 'King' },
  { species: 'Whale', name: 'Fail'}
];

for (var i = 0; i < animals.length; i++) {
  (function(i) {
    this.print = function() {
      printf('#' + i + ' ' + this.species
                  + ': ' + this.name);
    }
    this.print();
  }).call(animals[i], i);
}

/***************************************************
 * method: apply
 *
 *
 ***************************************************/
printf("\n==================== apply()====================\n");



/***************************************************
 * method: later
 *
 *
 ***************************************************/


printf("\n/******************** ECMAScript 6 ********************/\n");


/***************************************************
 * Arrows: function
 * Different than function, share the same 'this'
 *
 ***************************************************/
printf("\n==================== Arrows ====================\n");
// Expression bodies
var evens = [2, 4, 6];
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

printf(odds);
printf(nums);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// lexical this
var bob = {
  _name: "Bob",
  _friends: ["Yechen"],
  printfFriends() {
    this._friends.forEach(f =>
        printf(this._name + " knows " + f));   // "this" is the same as the function
  }
}


printf("\n==================== Classes ====================\n");

