require 'minitest/autorun'

## Here is the method that need to be implemented
## Step 1: use eval possible with code injection attack
def add_checked_attribute_1(clazz, attribute)
  eval "
    class #{clazz}
      def #{attribute}=(value)
        raise 'Invalid attribute' unless value  #if value is nil or false
        @#{attribute} = value
      end

      def #{attribute}
        @#{attribute}
      end
    end
  "
end

## Step 2: replace eval with standard Ruby methods
def add_checked_attribute(clazz, attribute)
  clazz.class_eval do     # get into class's scope
    define_method "#{attribute}=" do |value|
      raise 'Invalid attribute' unless value
      instance_variable_set("@#{attribute}", value)
    end

    define_method attribute do
      instance_variable_get("@#{attribute}")
    end
  end
end

## Step 3:
def add_checked_attribute(clazz, attribute, &checker)
  clazz.class_eval do     # get into class's scope
    define_method "#{attribute}=" do |value|
      raise 'Invalid attribute' unless checker.call(value)
      instance_variable_set("@#{attribute}", value)
    end

    define_method attribute do
      instance_variable_get("@#{attribute}")
    end
  end
end

## Step 4: open class
class Class
  def attr_checked(attribute, &validation)
    define_method "#{attribute}=" do |value|
      raise 'Invalid attribute' unless validation.call(value)
      instance_variable_set("@#{attribute}", value)
    end

    define_method attribute do
      instance_variable_get("@#{attribute}")
    end
  end
end



class Person
  attr_checked :age do |v|
    v >= 18
  end
end

class TestCheckedAttribute < MiniTest::Test
  def setup
    @bob = Person.new
  end

  def test_accepts_valid_values
    @bob.age = 20
    assert_equal 20, @bob.age
  end

  def test_refuses_invalid_values
    assert_raises RuntimeError, 'Invalid attribute' do
      @bob.age = 17
    end
  end
end


#add_checked_attribute(Person, :age)
#@bob = Person.new
#p Person.instance_methods.grep(/age/)












##################################################
## My solution
##
##################################################
#module CheckedAttributes
#  def attr_checked(attribute, &block)
#    # this self should be inside class Person
#    self.class_eval do
#      define_method "#{attribute}=" do |value|
#        raise 'Invalid attribute' unless block.call(value)
#        instance_variable_set("@#{attribute}", value)
#      end
#
#      define_method attribute do
#        instance_variable_get("@#{attribute}")
#      end
#    end
#  end
#end
#
#class Person
#  # add by included in the eigenclass
#  include CheckedAttributes
#  #extend CheckedAttributes
#
#  attr_checked :age do |v|
#    v >= 18
#  end
#end
#
#me = Person.new
#me.age = 39
#p me.age
#me.age = 11
#p me.age
