var global_var;

first_function();

function first_function() {
  var first_var = 1;
  second_function();
}

function second_function() {
  var second_var;
  var first_var;
  console.log(first_var);
}

second_function();
