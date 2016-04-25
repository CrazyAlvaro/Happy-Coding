var add = function(x, y) {
  return x + y;
};
// The Method Invocation Pattern
var myObject = {
  value: 0,
  increment: function(inc){
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
console.log(myObject.value);

myObject.value = 10;      // can access value directly, later we can put this variable into a closure
console.log(myObject.value);


// The constructor invocation pattern
var Quo = function(string) {
  this.status = string;
};

Quo.prototype.get_status = function() {
  return this.status;
}

var myQuo = new Quo("confused");    // -> confused

console.log(myQuo.get_status());

// The Apply Invocation Pattern

var array = [3,4]
var sum = add.apply(null, array);

var statusObject = {
  status: 'A-OK'
};

var status = Quo.prototype.get_status.apply(statusObject);
console.log(status);    // -> A-OK


// Closure
var quo = function(status) {
  return {
    get_status: function() {
      return status;
    }   // last object item
  };  // return an object
};

var myQuo = quo("amazed");

console.log(myQuo.get_status());  // There's no way to access status directly, only through getter method

// Compare to previous implementation
var pQuo = function(string) {
  this.status = string;
};

pQuo.prototype.get_status = function() {
  return this.status;
};

var myQuo = new pQuo("confused");
console.log(myQuo.get_status());
console.log(myQuo.status);        // no problem, status is an object of function pQuo
