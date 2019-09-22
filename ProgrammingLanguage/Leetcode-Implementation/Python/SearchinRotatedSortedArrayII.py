class Solution:
    # @param A a list of integers
    # @param target an integer
    # @return a boolean
    def search(self, A, target):
        """
        what if duplicate allowed, will it affect run time complexity
        Worst case is O(N), just use linear search!!!
        """
        for num in A:
            if num == target:
                return True
        
        return False
             
