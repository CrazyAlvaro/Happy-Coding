# 
# For example,
# Given
# 
#         1
#        / \
#       2   5
#      / \   \
#     3   4   6
# 
# The flattened tree should look like:
# 
#         1
#          \
#           2
#            \
#             3
#              \
#               4
#                \
#                 5
#                  \
#                   6
# 

# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @return nothing, do it in place
    def flatten(self, root):
        """ Flatten a binary tree into linked list in place"""
        if root == None:
            return root

        self.flatten(root.left)
        self.flatten(root.right)
        left_end = root.left

        if left_end == None:
            return  root

        while left_end.right != None:
            left_end = left_end.right

        left_end.right = root.right
        root.right = root.left      # not == None
        root.left = None
        
        return root 
        
