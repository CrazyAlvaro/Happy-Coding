# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

# For example:
# Given 1->2->3->4->5->NULL, m = 2 and n = 4,
#
# return 1->4->3->2->5->NULL. 


class Solution:
    # @param head, a ListNode
    # @param m, an integer
    # @param n, an integer
    # @return a ListNode
    def reverseBetween(self, head, m, n):
        """ reverse a linked list from m to n, do it in one pass"""
        if m == 1:
            return self.reverseFrom( head, n - m + 1) 
        else:
            # get the mth node
            prev, curr = None, head
            for _ in range(m - 1):
                if curr:
                    prev, curr = curr, curr.next 
                 
            prev.next = self.reverseFrom( curr, n - m + 1) 
            
            # since m > 1, head doesn't change
            return head

    def reverseFrom(self, head, length):
        """ 
        Reverse a linked list from the head to length th node
        Let's assume length >= len(head_list)
        Return a new head
        """
        if not head:
            return head

        sentry = ListNode(0)
        sentry.next = head

        prev, curr = None, head
        #for _ in range(length):
        while curr and length != 0:
            length = length - 1
            next_node = curr.next
            curr.next = prev
            
            prev = curr
            curr = next_node
        # previous head's next node is curr
        sentry.next.next = curr
        # prev is the new header
        return prev
            
def printList(node):
    #print "test"
    while node:
        print node.val
        node = node.next
#if __name__ == "__main__":
#    print "test"            
if __name__ == "__main__":
    node_1 = ListNode(10)
    node_2 = ListNode(20)
    node_3 = ListNode(30)
    node_4 = ListNode(40)
    node_5 = ListNode(50)

    node_1.next = node_2
    node_2.next = node_3
    node_3.next = node_4
    node_4.next = node_5
    printList(node_1) 
