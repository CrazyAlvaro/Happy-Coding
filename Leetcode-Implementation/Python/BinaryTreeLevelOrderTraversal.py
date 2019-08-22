# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @return a list of lists of integers
    def levelOrder(self, root):
        nodes = []
        curr = []
        next_nodes = []
        if root == None: return nodes
        curr.append( root )
        values = []
        while len(curr) != 0:
            for nd in curr:
                if nd == None:  continue
                values.append(nd.val)    
                next_nodes.append(nd.left)
                next_nodes.append(nd.right)
            curr = next_nodes
            if len(values) != 0: nodes.append(values)
            next_nodes = []
            values = []
        return nodes
