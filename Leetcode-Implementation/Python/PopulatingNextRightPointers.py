# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
#         self.next = None

class Solution:
    # @param root, a tree node
    # @return nothing
    def connect(self, root):
        if root == None:
            return
        if root.left != None:
            root.left.next = root.right
            if root.next != None:
                root.right.next = root.next.left
        self.connect( root.left )
        self.connect( root.right)
