#!/usr/bin/ruby -w

require 'rexml/document'
require 'rexml/streamlistener'
include REXML

# It is not suggested to use SAX-like parsing for a small file, this is just for a demo example
class MyListener
  include REXML::StreamListener
  def tag_start(*args) 
    puts "tag_start: #{args.map {|x| x.inspect}.join(', ')}"        # inspect similar to to_s
  end

  def text(data)
    return if data =~ /^\w*$/                                       # whitespace only
    abbrev = data[0..40] + (data.length > 40 ? "..." : "")          # get first 40 chars
    puts "  text  :   #{abbrev.inspect}" 
  end
end

list = MyListener.new
xmlfile = File.new("movies.xml")
Document.parse_stream(xmlfile, list)
