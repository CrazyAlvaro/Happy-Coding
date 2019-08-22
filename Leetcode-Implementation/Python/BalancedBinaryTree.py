# Definition for a  binary tree node
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Solution:
    # @param root, a tree node
    # @return a boolean
    def isBalanced(self, root):
        ret = self.height(root)
        return ret != -1 
    
    def height(self, node):
        if node == None:
            return 0
        left, right  = self.height( node.left ), self.height( node.right )
        if left == -1 or right == -1 or ( abs(left - right) > 1 ) :
            return -1
        return max(left, right) + 1

if __name__ == "__main__":
    root=TreeNode(1)
    sec=TreeNode(2)
    thir=TreeNode(3)
    root.right=sec
    sec.right=thir

    inst=Solution()
    ba= inst.isBalanced(root)
    print ba
