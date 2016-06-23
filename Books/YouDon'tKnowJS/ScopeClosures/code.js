CHAPTER 1

CHAPTER 2     -> DO NOT USE eval NOR with

/////////////////////////////////////////////////
// with
var obj = {
  a: 1,
  b: 2,
  c: 3
};

// more "tedious" to repeat "obj"
obj.a = 2;
obj.b = 3;
obj.c = 4;

// "easier" short-hand
with (obj) {
  a = 3;
  b = 4;
  c = 5;
}

function foo(obj) {
  with (obj) {
    a = 2;
  }
}

var o1 = {
  a: 3
};

var o2 = {
  b: 3
};

foo( o1 );
console.log( o1.a ); // 2

foo( o2 );
console.log( o2.a ); // undefined
console.log( a ); // 2 -- Oops, leaked global!

// Conclusion, DO NOT USE either eval or with

CHAPTER 3

// Only Function scope
// ES6 has block scope with 'let', 'const'
var foo = true;

if (foo) {
  { // <-- explicit block
    let bar = foo * 2;
    bar = something( bar );
    console.log( bar );
  }
}

console.log( bar ); // ReferenceError

{
  console.log( bar ); // ReferenceError!
  let bar = 2;
}

// const
var foo = true;

if (foo) {
  var a = 2;
  const b = 3; // block-scoped to the containing `if`

  a = 3; // just fine!
  b = 4; // error!
}

console.log( a ); // 3
console.log( b ); // ReferenceError!

CHAPTER 4

/////////////////////////////////////////////////
// Hoisting

// Demo 1
a = 2;
var a;
console.log( a );   // -> 2

// Compilation
var a
// Execution
a = 2;
console.log(a);

// Demo 2
console.log( a );
var a = 2;

// Compilation
var a ;
// Execution
console.log(a);   // So a is undefined, other than ReferenceError, since it has been declared
a = 2;

// Compiler first check all the declarations, Then execute code
{
  foo(); // TypeError
  bar(); // ReferenceError

  var foo = function bar() {
    // ...
  };
}

{
  foo(); // 3

  function foo() {
    console.log( 1 );
  }

  var foo = function() {
    console.log( 2 );
  };

  function foo() {
    console.log( 3 );
  }
}

// REVIEW: declaration first, execution( assignment ) second

CHAPTER 5

/////////////////////////////////////////////////
// Closure
function foo() {
    var a = 2;

    function bar() {
        console.log( a );
    }

    return bar;
}

var baz = foo();

baz(); // 2 -- Whoa, closure was just observed, man.

// bar still has a reference to that scope, the reference is called closure

// Wrong way to do, 6 6 6 6 6
for (var i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}

// Correct way
for(var i=1; i<=5; i++) {
  setTimeout( function timer(){
    console.log(curr);
  }, i*1000);
}

for (let i=1; i<=5; i++) {
    setTimeout( function timer(){
        console.log( i );
    }, i*1000 );
}

// Module Pattern
function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join( " ! " ) );
    }

    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// Modules

// Instantiate once, has innter function access private variable
// Just a function
function CoolModule() {
    var something = "cool";
    var another = [1, 2, 3];

    function doSomething() {
        console.log( something );
    }

    function doAnother() {
        console.log( another.join( " ! " ) );
    }

    // Return Object
    return {
        doSomething: doSomething,
        doAnother: doAnother
    };
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3

// JavaScript Singleton
var foo = (function CoolModule() {
  var something = "cool";
  var another = [1,2,3];

  function doSomething() {
    console.log(something);
  }

  funtion doAnother() {
    console.log( another.join("!"));
  }

  return {
    doSomething: doSomething,
    doAnother: doAnother
  }
})(); // invoke the function immediately

foo.doSomething();
foo.doAnother();

// Modern Modules
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for(var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }

    // Function.Prototypes.apply(thisVal, [argsArray])
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get
  }
})

// Usage
MyModules.define("bar", [], function(){
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello
  };
});

MyModules.define("foo", ["bar"], function(bar){
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

// hello, and awesome are two closures
console.log(
  bar.hello("hippo")
);  // Let me introduce: hippo

foo.awesome();

// ES6 MyModules

// File: bar.js
function hello(who) {
  return "Let me introduce: " + who;
}

export hello;

// File: foo.js

// Import only hello()
import hello from "bar";

var hungry = "hippo";

function awesome() {
  console.log(hello(hungry).toUpperCase());
}

export awesome;

// file: demo.js
module foo from "foo";
module bar from "bar";

console.log(bar.hello("rhino"));

foo.awesome();
