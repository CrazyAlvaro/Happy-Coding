import re

class Solution:
    # @param s, a string
    # @return a boolean
    def isPalindrome(self, s):
        s = s.lower()
        s = re.sub("[^0-9a-z]+","", s)

        front, end = 0, len(s) - 1
        while front < end:
            if s[front] != s[end]:
                return False
            front, end = front + 1, end - 1
        return True 

#class Solution:
#    # @param s, a string
#    # @return a boolean
#    def isPalindrome(self, s):
#        """
#        determine if a string is a palindrome,
#        considering only alphdanumeric char and ignoring
#        cases
#        """
#        if len(s) == 0:
#            return True
#        s = s.lower()   # convert string to lower case
#        print s
#        front, end = 0, len(s) - 1
#        while front < end:
#            while front < len(s) and not (s[front].isalnum()):
#                front = front + 1
#            while end >= 0 and not (s[end].isalnum()):
#                end = end - 1
#            if front >= end:
#                return True
#
#            if s[front] != s[end]:
#                return False
#            
#            front, end = front + 1, end - 1
#
#        return True

if __name__ == "__main__":
    string ="aA,..fsd324..';12"
    inst = Solution()
    print inst.isPalindrome(string)
    
#    def isSameAlphnumeric(self, fir_char, sec_char):
#        """
#        determine if two characters are the same
#        ignore cases
#        """
#
#    def isNumeric(self, char):
#        """
#        determine if a character is a number [0-9]
#        """
#
#    def isAlphabetic(self, char):
#        """
#        determine if a character is [a-zA-Z]
#        """
        
