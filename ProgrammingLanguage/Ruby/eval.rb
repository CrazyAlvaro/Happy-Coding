
class MyClass
end

#MyClass.instance_eval do
#  def instance_say
#    puts "instance_say"
#  end
#end
#
#MyClass.class_eval do
#  def class_say
#    puts "class_say"
#  end
#end

#MyClass.instance_say     # works
#MyClass.new.instance_say  # undefined method 'instance_say' for #<MyClass:)x007fb9f10f3068> (NoMethodError)
#MyClass.new.class_say    # works
#MyClass.class_say        # undefined method 'class_say for MyClass:Class (NoMethodError)

instance= MyClass.new

instance.instance_eval do
  def self.instance_say
    puts "instance_say"
  end
end

instance.instance_say

#puts MyClass.class
#puts instance.class
#
#puts instance.methods.grep(/^instance/)
#puts "===================="
#puts MyClass.methods.grep(/^instance/)

# class_eval is not a instance method
#instance.class_eval do
#  def class_say
#    puts "class_say"
#  end
#end
