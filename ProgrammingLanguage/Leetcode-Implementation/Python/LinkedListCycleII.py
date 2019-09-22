# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    # @param head, a ListNode
    # @return a list node
    def detectCycle(self, head):
        # remember each node visited, using a hash, use extra space 
        dictionary = dict()         
        while head != None:
            if head in dictionary:
                return dictionary[head]
            else:
                dictionary[head] = head
                head = head.next;

        return None
        # how to do it in-place ?
            
                    
#if __name__ == "__main__":
#    node1 = ListNode(-1)
#    node1 = ListNode(-7)
#    node1 = ListNode( 7)
#    node1 = ListNode(-4)
#    node1 = ListNode(19)
#    node1 = ListNode( 6)
#    node1 = ListNode(-9)
#    node1 = ListNode(-5)
#    node1 = ListNode(-2)
#    node1 = ListNode(-5)
#    node1 = ListNode(  )
#    node1 = ListNode(  )
#    node1 = ListNode(  )
