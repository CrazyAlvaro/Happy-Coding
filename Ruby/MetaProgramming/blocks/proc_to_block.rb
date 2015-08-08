def my_method(greeting)
  "#{greeting}, #{yield}!"
end

my_proc = proc { "Bill" }
my_method("Hello", &my_proc)

p = Proc.new {|a, b| [a,b]}
p p.arity
p p.call(1,2,3)
p p.call(1)

#callable = proc { return }
#callable.call
