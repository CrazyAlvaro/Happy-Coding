#!/usr/bin/ruby -w

require 'yaml'

content_1 = YAML.load_file('yml_1.yml')
content_2 = YAML.load_file('yml_2.yml')
# puts content.to_s
puts "YAML.load_file return type is: ", content_1.class
content = content_1.merge( content_2 )

puts  "=================================================="
puts  "           Iteration"

iter = 0
content.each do | name, details |
  puts name
  puts "adapter: " + details["adapter"]
  puts "database: " + details["database"]
  puts "host: " + details["host"]
  puts "\n"
  iter += 1
  if iter == 10
    break
  end
end

# puts  "=================================================="
# puts  "           Fetch specifig"
# 
# puts  "content[\"development\"]"
# puts  content["development"], "\n"
# 
# puts  "content[\"monitoring\"][\"host\"]"
# puts  content["monitoring"]["host"],  "\n"
# 
# puts  "content[\"monitoring\"][\"host\"]"
# puts  content["monitoring"]["host"]
