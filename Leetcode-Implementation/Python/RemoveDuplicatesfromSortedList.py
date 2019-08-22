# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def deleteDuplicates(self, head):
        if head == None:
            return
        curr = head
        while curr != None:
            next_node = curr.next
            while next_node != None and next_node.val == curr.val:
                next_node = next_node.next
            curr.next = next_node
            curr = next_node
        return head

class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def deleteDuplicates(self, head):
        if head == None:
            return
        next_node = head.next
        while next_node != None and next_node.val == head.val:
            next_node = next_node.next
        head.next = next_node
        self.deleteDuplicates(next_node)
        return head
