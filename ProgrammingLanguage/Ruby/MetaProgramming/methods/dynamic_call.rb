class MyClass
  def my_method(my_arg)
    my_arg*2
  end
end

obj = MyClass.new

# traditional way
puts obj.my_method(3)

# Object#send() in place of the dot notation
obj.send(:my_method, 3)
