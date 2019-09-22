# Definition for singly-linked list.
# class ListNode
#     attr_accessor :val, :next
#     def initialize(val)
#         @val = val
#         @next = nil
#     end
# end

# @param {ListNode} head
# @return {ListNode}
def delete_duplicates(head)
  if head.nil? || head.next.nil?
    return head
  end

  prev_val = head.val
  prev, curr = head, head.next

  while curr
    if curr.val == prev_val
      # remove curr_node
      prev.next = curr.next
      curr = curr.next
    else
      prev_val = curr.val
      prev, curr = curr, curr.next
    end
  end
  return head
end
