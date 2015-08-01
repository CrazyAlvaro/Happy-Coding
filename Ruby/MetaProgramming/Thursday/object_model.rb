# Add eigenclass method to all classes
class Object
  def eigenclass
    # enter the scope of the eigenclass
    class << self; self; end
  end
end

p '          ___________        '
p '         |           |       '
p '         |   Object  |       '
p '         |___________|       '
p '               ^             '
p '               | superclass  '
p '                             '
p '          ___________        '
p '         |           |       '
p '         |     C     |       '
p '         |___________|       '
p '                             '
p '               ^             '
p '               | superclass  '
p '                             '
p '          ___________        '
p '         |           |       '
p '         |     D     |       '
p '         |___________|       '
p '                             '
puts
puts
##################################################
#
#          ___________
#         |           |
#         |   Object  |
#         |___________|
#               ^
#               | superclass
#
#          ___________
#         |           |
#         |     C     |
#         |___________|
#
#               ^
#               | superclass
#
#          ___________
#         |           |
#         |     D     |
#         |___________|
#
#
##################################################
#
class C
  class << self
    def a_class_method
      'C.a_class_method'
    end
  end

  def a_method
    'C#a_method()'
  end
end

class D < C; end

obj = D.new
p 'obj.a_method: ' + obj.a_method

class << obj    # enter the eigenclass of obj
  def a_singleton_method
    'obj#a_singleton_method()'
  end
end

#p 'C.eigenclass: ' + C.eigenclass.name

