# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @param sum, an integer
    # @return a boolean
    def __init__(self):
        """ set up variable"""
        self.pathsum = False

    def hasPathSum(self, root, sum):
        """ determine a root-to-leaf path sums up to target number"""
        if root == None:    return False
        if self.isLeaf(root):
            return root.val == sum
        else:
            local_sum = sum - root.val
            left_res = self.hasPathSum( root.left, local_sum)
            right_res = self.hasPathSum( root.right, local_sum)
            return  left_res or right_res
         

    def isLeaf(self, node):
        if node == None:    return False
        if node.left == None and node.right == None:
            return True
        return False
        
