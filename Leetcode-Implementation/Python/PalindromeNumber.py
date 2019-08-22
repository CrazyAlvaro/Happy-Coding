class Solution:
    # @return a boolean
    def isPalindrome(self, x):
        """ check whether x is a palindrome number"""
        
        # reverse x could overflow!
        if x < 0:   return False
        num = str(x)
        for idx in range(len(num)/2):
            if num[idx] != num[-1-idx]:
                return False
        return True


                
