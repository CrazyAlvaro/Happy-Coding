module MyModule
  def self.my_method; 'hello'; end
  def in_method
    'in_method hello'
  end
end

class MyClass
  include MyModule
end

MyClass.instance_eval do
  include MyModule
end

MyClass.class_eval do
  include MyModule
end

p MyModule.my_method
#MyClass.my_method
#MyClass.in_method
