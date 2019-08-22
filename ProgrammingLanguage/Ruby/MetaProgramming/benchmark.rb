require 'benchmark'

n = 500000

Benchmark.bm do |x|
  x.report { for i in 1..n; a = "1"; end }
  x.report { n.times do   ; a = "1"; end }
  x.report { 1.upto(n) do ; a = "1"; end }
end


# minimize garbage collection overheads by running twice reverse order
array = (1..1000000).map {rand}

Benchmark.bmbm do |x|
  x.report("sort!") { array.dup.sort! }   #sort self in place
  x.report("sort")  { array.dup.sort  }
end
