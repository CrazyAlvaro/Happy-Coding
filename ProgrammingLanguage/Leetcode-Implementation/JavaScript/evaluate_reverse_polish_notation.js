// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
//
// Valid operators are +, -, *, /. Each operand may be an integer or another expression.
//
// Some examples:
//   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
//   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6

/**
 * @param {string[]} tokens
 * @return {number}
 */

var isOperator = function(expr) {
  switch(expr) {
    case "+":
    case "-":
    case "*":
    case "/":
      return true;
    default:
      return false;
  }
}

var processOperation = function(stack, operator) {
  if(stack.length < 2) throw "Invalid arithmetic expression";

  var second = stack.pop(), first  = stack.pop();

  switch(operator) {
    case "+":
      stack.push(first + second);
      break;
    case "-":
      stack.push(first - second);
      break;
    case "*":
      stack.push(first * second);
      break;
    case "/":
      if(second === 0) throw "Divided by 0";
      stack.push(parseInt(first/second));   // get the integer part, should always provide radis, to pass test this is bad
      break;
    default:
      throw "Unrecoganize operator";
  }
}

var isNumber = function(expr) {
  return !isNaN(expr);  // check if a string not contains a valid number
}

var evalRPN = function(tokens) {
  // use a stack, all integer in stack
  var stack = [];

  for(var it = 0; it < tokens.length; it++) {
    if(isOperator(tokens[it])) {
      processOperation(stack, tokens[it]);
    } else if(isNumber(tokens[it])) {
      stack.push( parseInt(tokens[it], 10) );
    } else {
      throw "Unrecoganize expression" + tokens[it];
    }
  }

  return Math.round(stack[0]);    // round to the nearst integer, 2.49 will be rounded down, 2.5 will be rouneded up
};

//   ["2", "1", "+", "3", "*"] -> ((2 + 1) * 3) -> 9
//   ["4", "13", "5", "/", "+"] -> (4 + (13 / 5)) -> 6
//console.log(evalRPN(["2", "1", "+", "3", "*"]));
console.log(evalRPN(["4", "13", "5", "/", "+"]));
//console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]));
