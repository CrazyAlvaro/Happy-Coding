# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    # @param head, a ListNode
    # @param x, an integer
    # @return a ListNode
    def partition(self, head, x):
        """
        Divide list into two sub list, concatenate them
        return  new head
        """
        fir_sentry, sec_sentry = ListNode(0), ListNode(0)
        fir_node, sec_node = fir_sentry, sec_sentry
        while head:
            if head.val >= x:
                sec_node.next = head
                sec_node = sec_node.next
            else:       # head.val < x
                fir_node.next = head
                fir_node = fir_node.next

            head = head.next                
        
        # set tail node next to None
        sec_node.next = None
        
        # combine two sub_list
        fir_node.next = sec_sentry.next 

        return fir_sentry.next
