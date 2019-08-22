CHAPTER 2

/////////////////////////////////////////////////
// Closure
function makeAdder(x) {
  //parameter `x` is an inner variable

    // inner function `add()` uses `x`, so
    // it has a "closure" over it
    function add(y) {
      return y + x;
    };

  return add;
}

// `plusOne` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusOne = makeAdder( 1 );

// `plusTen` gets a reference to the inner `add(..)`
// function with closure over the `x` parameter of
// the outer `makeAdder(..)`
var plusTen = makeAdder( 10 );

plusOne( 3 );       // 4  <-- 1 + 3
plusOne( 41 );      // 42 <-- 1 + 41

plusTen( 13 );      // 23 <-- 10 + 13

/////////////////////////////////////////////////
// Module
function User(){
    var username, password;

    function doLogin(user,pw) {
        username = user;
        password = pw;

        // do the rest of the login work
    }

    var publicAPI = {
        login: doLogin
    };

    return publicAPI;
}

// create a `User` module instance
var fred = User();

fred.login( "fred", "12Battery34!" );

/////////////////////////////////////////////////
// this
function foo() {
    console.log( this.bar );
}

var bar = "global";

var obj1 = {
    bar: "obj1",
    foo: foo
};

var obj2 = {
    bar: "obj2"
};

// --------

foo();              // "global"
obj1.foo();         // "obj1"
foo.call( obj2 );   // "obj2"
new foo();          // undefined

/////////////////////////////////////////////////
// Prototypes
var foo = {
    a: 42
};

// create `bar` and link it to `foo`
var bar = Object.create( foo );

bar.b = "hello world";

bar.b;      // "hello world"
bar.a;      // 42 <-- delegated to `foo`

// Polyfilling

if (!Number.isNaN) {
  Number.isNaN = function isNaN(x) {
    return x !== x;   // Only NaN return true
  };
}
// NaN values, which is that they're the only value in the whole
// language that is not equal to itself. So the NaN value is the
// only one that would make x !== x be true

// Transpiling
// So the better option is to use a tool that converts your newer code into older code equivalents.
// This process is commonly called "transpiling," a term for transforming + compiling.

function foo(a = 2) {
    console.log( a );
}

foo();      // 2
foo( 42 );  // 42

// transpiling to
function foo() {
    var a = arguments[0] !== (void 0) ? arguments[0] : 2;
    console.log( a );
}
