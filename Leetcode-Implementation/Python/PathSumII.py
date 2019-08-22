# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @param sum, an integer
    # @return a list of lists of integers
    def pathSum(self, root, sum):
        """
        Find all path sum equals to given number
        """
        self._paths_ = []
        path = []
        self.preorderTraversal( root, path, sum)
        return self._paths_
        

    def preorderTraversal(self, node, path, target):
        """
        modify path, if node is leaf, check == sum 
        """
        if node == None:
            return

        isleaf = 0
        
        # add current node's val
        path.append( node.val)  

        if node.left != None:
            isleaf += 1
            self.preorderTraversal( node.left, path, target)
        if node.right != None:
            isleaf += 1
            self.preorderTraversal( node.right, path, target)

        # is leaf, neither child != None, and meet target value
        if isleaf == 0 and sum(path) == target:
            new_path = path[:]   # create a new copy
            self._paths_.append(new_path)

        path.pop()  # pop current node value
            

