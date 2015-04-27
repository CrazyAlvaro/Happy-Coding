#!/usr/local/bin/ruby

backend_path    = "/Users/yechen/Dev/backend"
monitoring_path = "/Users/yechen/Dev/monitoring"
reporter_path   = "/Users/yechen/Dev/reporter"
archive_path    = "/Users/yechen/Dev/reports"

ctags = "ctags \-R \*"
pwd = "pwd"

Dir.chdir("#{backend_path}") do
  system "#{ctags}"
  puts "Finish generating tags in dir:#{backend_path}"
end

Dir.chdir("#{monitoring_path}") do
  system "#{ctags}"
  puts "Finish generating tags in dir:#{monitoring_path}"
end

Dir.chdir("#{reporter_path}") do
  system "#{ctags}"
  puts "Finish generating tags in dir:#{reporter_path}"
end

Dir.chdir("#{archive_path}") do
  system "#{ctags}"
  puts "Finish generating tags in dir:#{reporter_path}"
end
