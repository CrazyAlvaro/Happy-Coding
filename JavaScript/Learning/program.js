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

//document.writeln('Hello, world');

/******************** CHAPTER 5 Inheritance ********************/

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


for (var i = 0; i <= 40; i += 1) {
  document.writeln('//' + i + ': ' + fibonacci(i));
}

var factorial = memoizer([1,1], function (recur, n) {
    return n * recur(n - 1);
});
