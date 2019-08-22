# Definition for a  binary tree node
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    """ use recursive method to generate tree nodes"""

    # @return a list of tree node
    def generateTrees(self, n):
        """ 
        Generate all valid Binary Search Tree
        From 1 ~ n
        """
        return self.generateSubTrees(1, n)

    def generateSubTrees(self, start, end):
        """
        Generate a list of subtrees from start to end
        """    
        nodes_list = list()
        if start > end:
            nodes_list.append(None)
            return nodes_list 
        
        for curr in range(start, end+1):
            left_children = self.generateSubTrees( start, curr - 1)
            right_children = self.generateSubTrees( curr + 1, end)
            for left in left_children:
                for right in right_children:
                    curr_node = TreeNode( curr )
                    curr_node.left = left
                    curr_node.right = right
                    nodes_list.append( curr_node )
        
        return nodes_list

if __name__ == "__main__":
    inst = Solution()
    print len( inst.generateTrees(3) )
