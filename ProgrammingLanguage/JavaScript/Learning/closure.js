"use strict"

function foo(x) {
  let tmp = 3;

  return function(y) {
    console.log(x + y + (++tmp));
  }
}

var bar = foo(2); // bar is now a closure.
bar(10);
bar(10);

// Closure: the little girl with the princess inside...
// ... is really a princess with a little girl inside.

function princess() {
  var adventures = [];

  function princeCharming() {}

  var unicorn = {},
      dragons = {},
      squirrel = "Hello!";

  return {
    story: function() {
      return adventures[adventures.length - 1];
    }
  };
}

var littleGirl = princess();
var stories = littleGirl.story();

// Basically closure is : being able access out scope variables, remember the state
