def math(a, b)
  yield(a, b)
end

# & will take block into a proc
def do_math(a, b, &operation)
  math(a, b, &operation)
end

p do_math(2, 3) {|x, y| x * y}


def my_method(&the_proc)
  the_proc
end

process = my_method {|name| "Hello, #{name}"} # Get the_proc inside my_method
p process.class
p process.call("Bill")
