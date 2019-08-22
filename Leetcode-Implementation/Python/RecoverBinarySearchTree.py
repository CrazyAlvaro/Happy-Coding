# definition for a  binary tree node
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

# elements of a binary search tree (BST) are swapped by mistake.
# Recover the tree without changing its structure. 

class Solution:
    # @param root, a tree node
    # @return a tree node
    def recoverTree(self, root):
        """
        two nodes in binary search tree are swapped
        """

        # using inorder traversal to find odd node
        self.first_node, self.second_node = None, None
        self.prev = None
        self.inorder( root )

        # swap two nodes' value
        if self.second_node != None:
            print "found"
            temp_val = self.second_node.val
            self.second_node.val = self.first_node.val
            self.first_node.val = temp_val
        print "After swap"
        self.inorder( root)
        return root
    
    def inorder(self, node):
        if node == None:
            return
        
        self.inorder( node.left)
        
        if self.prev == None:
            self.prev = node
        elif self.prev.val > node.val:
            if self.first_node == None:
                self.first_node = self.prev
                self.second_node = node         # if only two nodes, and swapped
            else: 
                self.second_node = node         # encount second time
        else:
            self.prev = node 
        print node.val
        
        self.inorder( node.right)
            
if __name__ == "__main__":
    # test what if only two nodes in tree
    print "Test#1"
    node_1 = TreeNode(0)
    node_2 = TreeNode(1)
    node_1.left = node_2
    
    inst = Solution()
    inst.recoverTree( node_1 ) 

    print "Test#2"
    node_1.val = 2
    node_2.val = 1
    node_1.left = None
    node_1.right = node_2
    inst.recoverTree( node_1 ) 

    print "Test#3"
    node_1.val = 3
    node_2.val = 1
    node_3 = TreeNode(2)
    node_1.left = node_2
    node_1.right = node_3
    inst.recoverTree( node_1)
