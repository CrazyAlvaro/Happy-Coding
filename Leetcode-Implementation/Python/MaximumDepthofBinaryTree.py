# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
        # @param root, a tree node
        # @return an integer
        def maxDepth(self, root):
        # either DFS and BFS, same performance, BFS need a queue
       
        '''     my original buggy code
         DFS
         need a variable to store max depth and curr depth
        def dfs(self, node, max_depth, curr_depth):
            if node = None:
                return
            curr_depth++;
            if( curr_depth > max_depth ):
                max_depth = curr_depth
            dfs(node.left)
            dfs(node.right) 
                return
        ''' 
            
            if root == None:
                return 0
            # self is an explicit argument refer to specific object
            # recursive way to get the max height of two children, very clean code
            return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1

