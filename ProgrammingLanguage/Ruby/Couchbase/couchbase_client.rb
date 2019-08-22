#!/usr/bin/ruby

require File.expand_path(File.dirname(__FILE__) + '/cache')

#class CouchBase
#  def initialize(ip)
#  end
#
#  def store_data(ip, key, data)
#  end
#
#  def get_data(ip, key)
#  end
#end

usage = "Usage: couchbase_client.rb set/get key value(optional)"
cache = Cache.new

if ARGV[0].match /set/i
  begin 
    cache.set(ARGV[1], ARGV[2])
    puts "set successfully"
  rescue Exception => e
    puts "Error: #{e.to_s}"
    puts "#{usage}"
  end
elsif ARGV[0].match /get/i
  begin 
    puts cache.get(ARGV[1])
  rescue Exception => e
    puts "Error: #{e.to_s}"
    puts "#{usage}"
  end
else
  puts "#{usage}"
end
