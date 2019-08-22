// Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
//
// For example, given n = 3, a solution set is:
//
// "((()))", "(()())", "(())()", "()(())", "()()()"

/**
 * @param {number} n
 * @return {string[]}
 */

var generator = function(result_array, parentheses, left, right) {
  if(right === 0) {
    //console.log(parentheses);
    result_array.push(parentheses);
    return;
  }

  if(left === 0 && right > 0) {
    parentheses += ")";
    generator(result_array, parentheses, left, right - 1);
  }

  if(left > 0 && left === right) {
    parentheses += "(";
    generator(result_array, parentheses, left - 1, right);
  }

  if(left > 0 && left < right) {
    generator(result_array, parentheses + "(", left - 1, right);
    generator(result_array, parentheses + ")", left, right - 1);
  }
};

var generateParenthesis = function(n) {
  // solution: left: counter, right: counter
  // recrusive call function with counter_left and counter_right,
  // as long as left <= right, it's well-formed

  var left = n, right = n;
  var parentheses = "";
  var result_array = [];

  // calling recursive function
  generator(result_array, parentheses, left, right );

  console.log(result_array);
  return result_array;
};

generateParenthesis(3);
