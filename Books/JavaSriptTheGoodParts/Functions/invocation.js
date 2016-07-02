// 1: Method Pattern
var myObject = {
  value: 0,
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
console.log(myObject.value);

myObject.increment(2);
console.log(myObject.value);

// 2: The Fucntion Invocation Pattern
myObject.double = function() {
  var that = this;
  var helper = function() {
    that.value = add(that.value, this.value)
  };

  helper();
}

// invoke double as a method
myObject.double();
console.log(myObject.value);

// 3: The Constructor Invocation Pattern

// Create a constructor called Quo
// It makes an object with a status property.
var Quo = function(string) {
  this.status = string;
}

Quo.prototype.get_status = function() {
  return this.status;
};

// Make an instance of Quo.
var myQuo = new Quo("clear");
console.log(myQuo.get_status());

// 4: The Apply Invocation Pattern
var array = [3, 4];

// First argument bound to this, the second is an array of parameters
var sum = add.apply(null, array);

// Make an object with a status member.
var statusObject = {
  status: 'A-OK';
}

var status = Quo.prototype.get_status.apply(statusObject);
