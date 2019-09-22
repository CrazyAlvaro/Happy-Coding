# implement the following operations of a queue using stacks.
#
#   push(x) -- Push element x to the back of queue.
#   pop() -- Removes the element from in front of queue.
#   peek() -- Get the front element.
#   empty() -- Return whether the queue is empty.

#   Notes:
#   You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
#   Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), as long as you use only standard operations of a stack.
#   You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).

class Queue
  # Initialize your data structure here.
  def initialize
    # push, pop, length, empty?
    @left_stack = Array.new     # push to left
    @right_stack = Array.new    # pop from right
  end

  def transit_stack
    # pop items from left_stack to right_stack, only right_stack is empty
    if !@right_stack.empty?
      raise "Right_stack is not empty!"
    end

    while !@left_stack.empty?
      @right_stack.push( @left_stack.pop() )
    end
  end

  # @param {Integer} x
  # @return {void}
  def push(x)
    @left_stack.push(x)
  end

  # @return {void}
  def pop
    if @right_stack.empty?
      self.transit_stack
    end
    @right_stack.pop()
  end

  # @return {Integer}
  def peek
    if @right_stack.empty?
      self.transit_stack
    end
    @right_stack.last
  end

  # @return {Boolean}
  def empty
    @left_stack.empty? && @right_stack.empty?
  end
end

test_queue = Queue.new
test_queue.push(1)
test_queue.push(2)
test_queue.push(3)
p test_queue.pop
p test_queue.pop
test_queue.push(4)
test_queue.push(5)
test_queue.push(6)
p test_queue.pop
p test_queue.pop
