//foo(); // TypeError
//bar(); // ReferenceError

var foo = function bar() {
  // ...
  console.log(1);
};

//bar();

//foo();
//

// for (var i=1; i<=5; i++) {
//   setTimeout( function timer(){
//     console.log( i );
//   }, i*1000 );
// }

var helper =function(i) {
  return function(e) {
    console.log(i);
  };
};

for(var i=1; i<=5; i++) {
  setTimeout(helper(i), i*1000);
}
