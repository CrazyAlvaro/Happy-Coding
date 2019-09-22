# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

#Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
#Output: 7 -> 0 -> 8

class Solution:
    # @return a ListNode
    def addTwoNumbers(self, l1, l2):
        """
        Non-negative number and in reverse order
        """
        
        carry = 0
        sentry = ListNode(0)
        prev = sentry

        # can combine three into one loop
        while l1 and l2:
            curr_sum = l1.val + l2.val + carry
            carry = curr_sum / 10
            curr_sum = curr_sum % 10

            curr_node = ListNode( curr_sum )
            prev.next = curr_node
            prev = curr_node
            
            l1, l2 = l1.next , l2.next

        while l1:
            curr_sum = l1.val + carry
            carry = curr_sum /10
            curr_sum = curr_sum % 10
            
            curr_node = ListNode( curr_sum ) 
            prev.next = curr_node
            prev = curr_node
            l1 = l1.next

        while l2:
            curr_sum = l2.val + carry
            carry = curr_sum /10
            curr_sum = curr_sum %10

            curr_node = ListNode( curr_sum)
            prev.next = curr_node
            prev = curr_node
            l2 = l2.next

        if carry != 0:
            curr_node = ListNode( carry )
            prev.next = curr_node

        return sentry.next

if __name__ == "__main__":
    node1 = ListNode(2)
    node2 = ListNode(4)
    node3 = ListNode(3)

    node1.next = node2
    node2.next = node3

    node4 = ListNode(5)
    node5 = ListNode(6)
    node6 = ListNode(4)

    node4.next = node5
    node5.next = node6
    
    test = Solution()
    new_node = test.addTwoNumbers( node1, None)

    while new_node:
        print new_node.val
        new_node = new_node.next
