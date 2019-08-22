CHAPTER 1

function foo(num) {
    console.log( "foo: " + num );

    // keep track of how many times `foo` is called
    // Note: `this` IS actually `foo` now, based on
    // how `foo` is called (see below)
    this.count++;
}

foo.count = 0;

var i;

for (i=0; i<10; i++) {
    if (i > 5) {
        // using `call(..)`, we ensure the `this`
        // points at the function object (`foo`) itself
        foo.call( foo, i );
    }
}
// foo: 6
// foo: 7
// foo: 8
// foo: 9

// how many times was `foo` called?
console.log( foo.count ); // 4

// this is actually a binding that is made
// when a function is invoked, and what it references
// is determined entirely by the call-site
// where the function is called.

CHAPTER 2

//function foo() {
//    "use strict";
//
//    console.log( this.a );
//}

var a = 2;

// foo(); // TypeError: `this` is `undefined`

function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // `fn` is just another reference to `foo`

    fn(); // <-- call-site!
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // `a` also property on global object

// We just pass a function reference
doFoo( obj.foo ); // "oops, global"

// Explicit Binding
function foo() {
    console.log( this.a );
}

var obj = {
    a: 2
};

foo.call( obj ); // 2

function foo(el) {
    console.log( el, this.id );
}

var obj = {
    id: "awesome"
};

// use `obj` as `this` for `foo(..)` calls
[1, 2, 3].forEach( foo, obj ); // 1 awesome  2 awesome  3 awesome

CHAPTER 3

// Built-in Objects
// String, Number, Boolean, Object, Function, Array, Data, RegExp, Error

// Object property names are always string

CHAPTER 4

Classes are a design pattern

CHAPTER 5
