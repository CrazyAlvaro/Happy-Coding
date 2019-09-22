# Given a string s, partition s such that every substring of the partition is a palindrome.
# 
# Return the minimum cuts needed for a palindrome partitioning of s.
# 
# For example, given s = "aab",
# Return 1 since the palindrome partitioning ["aa","b"] could be produced using 1 cut.

class Solution:
    # @param s, a string
    # @return an integer
    def minCut(self, s):
        """
        return the minimun cut needed to partition s to palindrome
        """
        # Approach: up to every position, check every valid palindrome up to this pos
        # and the min_cut needed before that palindrome, 

        cut_count = [ idx for idx in range(len(s)) ]    # cut each single letter
        length = len(s)
        palind_matrix = [ [False for _ in range( length )] for _ in range((length))]
        
        # each iteration, check up to right, what's the min cur needed
        for right in range(length):
            for left in range( right, -1, -1):
                if s[left] == s[right] and ( right - left < 2 or palind_matrix[left + 1][right - 1] ):
                    palind_matrix[left][right] = True
                    
                    if left == 0:   # the whole substring is a valid palindrome
                        cut_count[right] = 0
                    else:
                        cut_count[right] = min( cut_count[right], cut_count[left-1] + 1)

        
        return cut_count[length -1]


# Unit Test
if __name__ == "__main__":
    inst = Solution()
    s = "aab"
    print s, inst.minCut(s)
                    
        
