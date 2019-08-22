#Given a binary tree, determine if it is a valid binary search tree (BST).
#
#Assume a BST is defined as follows:
#
#The left subtree of a node contains only nodes with keys less than the node's key.
#The right subtree of a node contains only nodes with keys greater than the node's key.
#Both the left and right subtrees must also be binary search trees.


# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @return a boolean
    def isValidBST(self, root):
        tree_nodes = [] 
        # inorder traversal see is the output list sorted
        self.inorderTraversal(root, tree_nodes)

        # python all(iterable) built-in function
        return all( tree_nodes[idx] < tree_nodes[idx+1] for idx in range(len(tree_nodes) -1) ) 

    def inorderTraversal(self, node, tree_nodes):
        if node == None:    return
        
        self.inorderTraversal( node.left, tree_nodes)
        tree_nodes.append( node.val)
        self.inorderTraversal( node.right, tree_nodes)


                    
