"use strict";

var object = {
  a: 2,
  m: function(b){
    return this.a + 1;
  }
};

console.log(object.m());

// create an object that inherits from object
var p = Object.create(object);

console.log("before set p.a = 12: ", p.m());
p.a = 12;
console.log("after set p.a = 12: ", p.m());

/*********************  Ways to Create objects and resulting prottotype chan ****************/


/********** Object created with syntax constructs ***********/

var o = {a: 1};
// The newly created object o has Object.prototype as its [[Prototype]]
// o ---> Object.prototype ---> null

var a = ["yo", "whadup", "?"];
// a ---> Array.prototype ---> Object.prototype ---> null
// has methods like indexOf, forEach etc.

function f(){
  return 2;
}
// f ---> Function.prototype ---> object.prototype ---> null
// has methods like call, bind, etc.


/********** With a constructor **********/
function Graph() {
  this.vertices = [];
  this.edges = [];
}

Graph.prototype = {
  addVertex: function(v){
    this.vertices.push(v);
    console.log("Push value: ", v);
  }
};

var g = new Graph();    //******************** using " NEW " here
g.addVertex(3);

/********** With Object.create **********/

var a = {a: 1};
// a ---> Object.prototype ---> null

var b = Object.create(a);
// b ---> a ---> Object.prototype ---> null

console.log(b.a);


/********** With the class keyword **********/

class Polygon{
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }

  get area() {
    return this.height * this.width;
  }

  get sideLength() {
    return this.height;
  }

  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
console.log("length is: ", square.sideLength, " area is: ", square.area);

square.sideLength = 3;
console.log("length is: ", square.sideLength, " area is: ", square.area);

var Foo = function(){
  this.A = 1;
  this.B = 2;
};

var foo = new Foo();
console.log(foo.A);
console.log(foo.B);
