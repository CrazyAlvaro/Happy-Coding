#  Given a linked list, remove the nth node from the end of list and return its head.
#
#  For example,
#
#  Given linked list: 1->2->3->4->5, and n = 2.
#
#  After removing the second node from the end, the linked list becomes 1->2->3->5.
#  Note:
#  Given n will always be valid.
#  Try to do this in one pass.

# Definition for singly-linked list.
class ListNode
    attr_accessor :val, :next
    def initialize(val)
        @val = val
        @next = nil
    end
end


class Queue
  def initialize(size)
    @queue = Array.new
    @length = size
  end

  def empty?
    return @queue.length == 0
  end

  def head
    head_item = self.empty? ? nil : @queue[0]
    head_item
  end


  def is_full?
    return @queue.length == @length
  end

  def pop
    if @queue.size > 0
      puts "Called pop"
      puts @queue
      @queue = @queue.drop(1)
      puts @queue
    end
  end

  def push(item)
    if self.is_full?
      self.pop
    end
    @queue.push(item)
  end
end

# @param {ListNode} head
# @param {Integer} n
# @return {ListNode}
def remove_nth_from_end(head, n)
  # Given n will always be valid
  sentry = ListNode.new(0)
  sentry.next = head

  #maintain a queue with size n + 1, when reaching the end, remove the second node in the queue
  queue = Queue.new(n+1)

  curr = sentry
  while curr
    queue.push(curr)
    curr = curr.next
  end

  curr = queue.head
  puts "curr: ",  curr.val
  curr.next = curr.next.next  # delete nth node
  return sentry.next
end

head = ListNode.new(1)
tail = ListNode.new(2)
head.next = tail

node = remove_nth_from_end(head, 1)


while node
  puts node.val
  node = node.next
end
