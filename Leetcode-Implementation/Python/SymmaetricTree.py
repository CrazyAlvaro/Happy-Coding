class Solution:
    # @param root, a tree node
    # @return a boolean
    def isSymmetric(self, root):
        sym = True
        if root == None:
            return sym
        sym = self.symmetricHelp( root.left, root.right )
        return sym
        
    def symmetricHelp(self, left, right ):
        if left == None and right == None:
            return True
        if left == None or right == None or left.val != right.val:
            return False
        left_sym = self.symmetricHelp( left.left, right.right )
        right_sym = self.symmetricHelp( left.right, right.left )
        return left_sym and right_sym
