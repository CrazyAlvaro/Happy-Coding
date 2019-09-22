# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    """ remove Nth node from the end of the list"""
    # @return a ListNode
    def removeNthFromEnd(self, head, n):
        # Method: 1 
        # using a queue with size n + 1, add a sentry in front of the list
        #sentry = ListNode(0)
        #sentry.next = head
        #node_queue = Queue( n + 1)
        #
        #curr_node = sentry
        #while curr_node != None:
        #    node_queue.put(curr_node)
        #    curr_node = curr_node.next 
        #
        #node = node_queue.get()
        #delete_node = node_queue.get()
        #node.next = delete_node.next
        #return sentry.next

        # Method: 2
        # scan the list twice, first get the size and calc the position 

        length = 0
        curr_node = head
        while curr_node:
            length += 1
            curr_node = curr_node.next

        if n > length:
            print "invalid input"
            return head
        
        sentry = ListNode(0)
        sentry.next = head
        
        length -= n
        curr_node = sentry
        while length > 0:
            curr_node = curr_node.next
            length -= 1
        
        curr_node.next = curr_node.next.next
        return sentry.next
