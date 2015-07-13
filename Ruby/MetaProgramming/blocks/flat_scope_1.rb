my_var = "Success"

class MyClass
  # we want to print my_var here

  def my_method
   puts "#{my_var} in the method!"
  end
end

instnace = MyClass.new
instnace.my_method
