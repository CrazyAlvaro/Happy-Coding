class Solution:
    # @param s, a string
    # @return an integer
    def lengthOfLastWord(self, s):
        words = s.split()
        if len(words) == 0:
            return 0
        return len(words[-1])
