import sys
# Definition for a  binary tree node
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    # @param root, a tree node
    # @return an integer
    def maxPathSum(self, root):
        self._max_sum_ = - sys.maxint
        print self._max_sum_
        self.maxSumWithNode( root ) 
        return self._max_sum_

    def maxSumWithNode(self, node):
        """
        @ param: node
        @ return value: integer, maximum value with a path through node
        """
        if node == None:
            return 0

        left_sum = self.maxSumWithNode( node.left)
        righ_sum = self.maxSumWithNode( node.right)
        
        child_max = max( left_sum, righ_sum ) 
        this_max  = max( node.val, max( left_sum + node.val, righ_sum + node.val ) )
        self._max_sum_ = max( self._max_sum_, max(left_sum + righ_sum + node.val, this_max ) )
        return this_max
        
if __name__ == "__main__":
    root = TreeNode(0)
    inst = Solution()
    value = inst.maxPathSum(root)
    print value
