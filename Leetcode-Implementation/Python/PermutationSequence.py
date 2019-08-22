# The set [1,2,3,...,n] contains a total of n! unique permutations.
# 
# By listing and labeling all of the permutations in order,
# We get the following sequence (ie, for n = 3):
# 
# 1 "123"
# 2 "132"
# 3 "213"
# 4 "231"
# 5 "312"
# 6 "321"
# Given n and k, return the kth permutation sequence.
# 
# Note: Given n will be between 1 and 9 inclusive.

import math

class Solution:
    # @return a string
    def getPermutation(self, n, k):
        """
        Return the kth permutation sequence
        """
        # two ways:
        # First: use generator to get nth sequence
        # Scond: use mathematics characters to direct generate nth sequence
            # recursively group n! (n-1)! (n-2)! ... 3! 2! 1! number
        
        # for each position, get the idx by divide 

        
        letters = range(1,n+1)  #letters = [ idx + 1 for idx in range(n) ] 

        ret_seq = ""
        for idx in range(n):
            group_num = math.factorial(n- idx -1)       # how many number in sub_group
            curr_pos = (k - 1)/ group_num
            ret_seq += str( letters[curr_pos] )
            letters.pop(curr_pos)
            k = k % group_num

        return ret_seq

if __name__ == "__main__":
    inst = Solution()
    print inst.getPermutation(3,5)
            
            


