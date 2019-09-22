# Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
#
# push(x) -- Push element x onto stack.
# pop() -- Removes the element on top of the stack.
# top() -- Get the top element.
# get_min() -- Retrieve the minimum element in the stack.

class MinStack
  # Initialize your data structure here
  def initialize
    @stack = Array.new
    @min_stack = Array.new
  end

  # @param {Integer} x
  # @return {Void} nothing
  def push(x)
    if @min_stack.length == 0 || @min_stack[-1] >= x
      @min_stack.push(x)
    end

    @stack.push(x)
  end

  # @return {Void} nothing
  def pop
    raise "Empty stack" if @stack.length <= 0

    item = @stack.pop
    if item == @min_stack[-1]
      @min_stack.pop
    end
  end

  # @return {Integer}
  def top
    if @stack.length > 0
      return @stack[-1]
    end
  end

  # @return {Integer}
  def get_min
    return @min_stack[-1] if @min_stack.length > 0
  end
end

if __FILE__ == $0
  min_stack = MinStack.new
  min_stack.push(-2)
  min_stack.push(0)
  min_stack.push(-1)
  puts min_stack.get_min
  puts min_stack.top
  min_stack.pop
  puts min_stack.get_min
end
