# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
#
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    # @param head, a list node
    # @return a tree node
    def sortedListToBST(self, head):
        """ convert sorted list to balanced binary search tree"""
        self._curr_node_ = head
        size = 0
        while head != None:
            size = size + 1
            head = head.next
        
        return self.inOrderTraversal( 1, size )

    def inOrderTraversal(self, start, end):
        if start > end:
            return None

        middle = (start + end)/2

        left_child = self.inOrderTraversal(start, middle - 1)

        curr_node = TreeNode( self._curr_node_.val )
        self._curr_node_ = self._curr_node_.next        # forward list node
        
        right_child = self.inOrderTraversal(middle + 1, end)

        curr_node.left = left_child
        curr_node.right = right_child
        
        return curr_node
