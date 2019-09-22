# Definition for a  binary tree node
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    # @param root, a tree node
    # @return an integer
    def sumNumbers(self, root):
        """
        get the sum of all root to leaf integer 
        return an integer
        """
        self._sum_ = 0      #variable to store total sum
        self._curr_num_ = 0 #variable to store temp current number
        self.getRootToLeafNum( root )
        return self._sum_

    def getRootToLeafNum(self, node):
        """
        recursive function to get root to leaf number
        """
        if node == None:
            return None

        self._curr_num_ = self._curr_num_*10 + node.val

        if self.isLeaf( node ):
            self._sum_ += self._curr_num_ 
        else:
            self.getRootToLeafNum( node.left )
            self.getRootToLeafNum( node.right)

        self._curr_num_ = self._curr_num_ / 10

        return None
            

    def isLeaf(self, node):
        """ 
        check whether this node is a leaf
        """
        if node == None:
            return False

        if node.left == None and node.right == None:
            return True

        return False


if __name__ == "__main__":
    """ unit test """

    inst = Solution()
