# definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    # @param a list of ListNode
    # @return a ListNode
    def mergeKLists(self, lists):
        """
        merge list of lists
        """
        if len(lists) == 0:
            return None
        # merge every two lists, add new list to a new list, until size == 1
        while len(lists) > 1:
            new_list = []
            for idx in range(0, len(lists), 2):
                if idx + 1 == len(lists):
                    new_list.append( lists[idx] )                                    
                else:
                    new_list.append( self.mergeTwoLists( lists[idx], lists[idx+1] ) )
            lists = new_list
        return lists[0]

    def mergeTwoLists(self, fir_node, sec_node):
        """
        take two sorted linked-list, merge to a new linked-list and return new linked-list head
        """
        sentry = ListNode(0)
        prev = sentry
        while fir_node != None  and sec_node != None  :
            if fir_node.val < sec_node.val:
                prev.next = fir_node
                prev = fir_node
                fir_node = fir_node.next
            else:
                prev.next = sec_node
                prev = sec_node
                sec_node = sec_node.next

        if fir_node == None:
            prev.next = sec_node
        else:
            prev.next = fir_node

        return sentry.next







""" Time limit exceeded: n is the number of total nodes, then O(kn)
    if n*n matrix, then time complexity is O(N*N*N)
    if use divide and conqure merge every two, O(N*N*logN)
class Solution:
    # @param a list of ListNode
    # @return a ListNode
    def mergeKLists(self, lists):
        sentry = ListNode(0)
        curr = sentry 
        while True:
            small = -1 
            for idx in range(len(lists)):
                if lists[idx]== None:
                    continue
                if small == -1 or lists[small].val > lists[idx].val:
                    small = idx 
            if small == -1:
                break
            else:
                curr.next = lists[small]
                curr = curr.next
                lists[small] = lists[small].next
        
        return sentry.next
"""
            
