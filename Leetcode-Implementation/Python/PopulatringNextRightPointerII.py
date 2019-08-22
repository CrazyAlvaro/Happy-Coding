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
        """
        using a list, perform level order traversal
        """
        
        node_list = [root]

        while len(node_list) != 0:
            next_list = []
            prev = None 
            for node in node_list:
                if node == None:
                    continue
                
                if prev == None:
                    prev = node
                else:
                    prev.next = node     
                    prev = node

                next_list.append( node.left )
                next_list.append( node.right)
            
            node_list = next_list

        return root

