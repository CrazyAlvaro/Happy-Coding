#!/usr/bin/ruby

def test_block
  yield
end

test_block{ puts "Hello world"}
