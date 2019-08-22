# '.' Matches any single character.
# '*' Matches zero or more of the preceding element.
# 
# The matching should cover the entire input string (not partial).
# 
# The function prototype should be:
# bool isMatch(const char *s, const char *p)
# 
# Some examples:
# isMatch("aa","a")  false
# isMatch("aa","aa")  true
# isMatch("aaa","aa")  false
# isMatch("aa", "a*")  true
# isMatch("aa", ".*")  true
# isMatch("ab", ".*")  true
# isMatch("aab", "c*a*b")  true


class Solution:
    # @return a boolean
    def isMatch(self, s, p):
        """
        check if string s is matched to pattern p
        """
        plist = self.split_pattern(p) 

        if len(plist) == 0:
            return len(s) == 0  

        pelement = plist[0]
        #plist = plist[1:]

        if pelement.endswith("*"): 
            # 0 or more match
            if pelement.startswith("."):
                return self.isMatch(s, p[2:] ) or ( len(s) > 0 and self.isMatch(s[1:], p) )
            else:
                return self.isMatch(s, p[2:] ) or ( len(s) > 0 and s[0] == p[0] and self.isMatch(s[1:], p) )
        else:
            # single char
            if pelement.startswith("."):
                return len(s) > 0 and self.isMatch( s[1:], p[1:] )
            else:
                return len(s) > 0 and s[0] == p[0] and self.isMatch( s[1:], p[1:])

    def split_pattern(self, pattern):
        """
        split pattern into single part like: a, a*, .*
        """
        plist = []
        
        while len(pattern) > 0:
            if len(pattern) == 1:
                plist.append(pattern[0])
                pattern = pattern[1:]
            else:
                # len(pattern) >= 2 
                if pattern[1] == "*":
                    plist.append( pattern[:2] )
                    pattern = pattern[2:]
                else:
                    plist.append( pattern[:1] )
                    pattern = pattern[1:]
        #print "split_pattern", plist
        return plist


#Unit test
if __name__ == "__main__":
    inst = Solution()
    assert inst.isMatch("aa","a") == False     , "not perform as expected "
    assert inst.isMatch("aa","aa") == True     , "not perform as expected "
    assert inst.isMatch("aaa","aa") == False   , "not perform as expected "
    assert inst.isMatch("aa", "a*") == True    , "not perform as expected "
    assert inst.isMatch("aa", ".*") == True    , "not perform as expected "
    assert inst.isMatch("ab", ".*") == True    , "not perform as expected "
    assert inst.isMatch("aab", "c*a*b") == True, "not perform as expected "

