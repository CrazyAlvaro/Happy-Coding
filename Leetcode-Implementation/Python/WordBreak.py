"""
Given a string s and a dictionary of words dict, determine 
if s can be segmented into a space-separated sequence of one or more dictionary words.

For example, given
s = "leetcode",
dict = ["leet", "code"].

Return true because "leetcode" can be segmented as "leet code".
"""
#
#   using a DP method with complexity O(n*n)
class Solution:
    # @param s, a string
    # @param dict, a set of string
    # @return a boolean
    def wordBreak(self, s, dict):
        break_list = [ False for _ in range(len(s) + 1)]
        break_list[0] = True
        for idx in range(1, len(s) + 1):
            for sub_idx in range(idx):
                if break_list[sub_idx] and s[sub_idx:idx] in dict:
                    break_list[idx] = True
                    break
            

        return break_list[len(s)]
                        




# This recursive method exceed time limit

#class Solution:
#    # @param s, a string
#    # @param dict, a set of string
#    # @return a boolean
#    def __init__(self):
#        self.res = False
#
#    def wordBreak(self, s, dict):
#        """determine if s can be segmented into a space-seperated sequence of words"""
#        if len(s) == 0 or self.res == True: 
#            self.res = True 
#            return self.res
#
#        for idx in range(1, len(s)):
#            if self.res == True:    
#                break
#
#            sub_str = s[0:idx]
#            if sub_str in dict:
#                self.wordBreak( s[idx:], dict)
#
#        return  self.res 
