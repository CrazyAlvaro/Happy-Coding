# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @return a list of integers
    def postorderTraversal(self, root):
        values = []
        self.postHelp(root, values)
        return values 

    def postHelp(self, node, values):
        if node == None:    return

        self.postHelp(node.left, values)
        self.postHelp(node.right,values)
        values.append(node.val)
