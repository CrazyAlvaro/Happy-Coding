require 'beaneater'
require 'JSON'

# Connect to pool
@beanstalk = Beaneater.new('192.168.8.240:9000')

# Enqueue jobs to tube
@tube = @beanstalk.tubes["my-tube"]
@tube.put '{ "key" : "foo" }', :pri => 5
@tube.put '{ "key" : "bar" }', :delay => 3
# Process jobs from tube
while @tube.peek(:ready)
  job = @tube.reserve
  puts "job value is #{JSON.parse(job.body)["key"]}!"
  job.delete
end
# Disconnect the pool
@beanstalk.close
