# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    """
    # @param root, a tree node
    # @return an integer
    """
    def minDepth(self, root):
        """Find the minumum depth of the tree"""
        if root == None:    return 0
        level_nodes = [root]
        depth = 1
        while len(level_nodes) != 0:
            next_level = []
            for node in level_nodes:
                if self.isLeaf(node):    return depth
                self.addChild( next_level, node)
            depth += 1
            level_nodes = next_level
                
    def isLeaf(self, node):
        if node.left == None and node.right == None:
            return True
        return False

    def addChild(self, level_nodes, node):
        if node == None:        return
        if node.left != None:   level_nodes.append(node.left)
        if node.right != None:  level_nodes.append(node.right)
