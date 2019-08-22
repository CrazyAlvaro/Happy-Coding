class Stack
  # Initialize your data structure here.
  def initialize
    @queue = Queue.new
  end

  # @param {Integer} x
  # @return {void}
  def push(x)
    @queue.push(x)
  end

  # @return {void}
  def pop
    it = 0
    while it < @queue.length - 1 do
      it += 1
      @queue.push( @queue.pop )
    end
    top_value = @queue.pop
    top_value
  end

  # @return {Integer}
  def top
    it = 0
    while it < @queue.length - 1 do
      it += 1
      @queue.push( @queue.pop )
    end
    top_value = @queue.pop
    @queue.push(top_value)
    top_value
  end

  # @return {Boolean}
  def empty
    @queue.empty?
  end
end


if __FILE__ == $0
  stack = Stack.new
  stack.push(1)
  stack.push(2)
  puts stack.top
  stack.push(3)
  stack.push(4)
  puts stack.pop
  puts stack.pop
end
