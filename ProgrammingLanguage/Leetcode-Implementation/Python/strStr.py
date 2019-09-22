class Solution:
    def strStr(self, haystack, needle):
        """
        haystack is like a string to be matched
        needle is string pattern
        return Nothing
        """
        str_len = len(haystack)
        pat_len = len(needle)
        prefix_func = self.genPrefixFunct(needle)
        matched_pos = -1                            # -1 means current not match any character
        if pat_len == 0:
            return haystack

        for idx in range(str_len):
            # while matched_pos is somewhere but current character does not match
            while matched_pos > -1 and needle[ matched_pos + 1 ] != haystack[ idx ]:
                matched_pos = prefix_func[matched_pos]

            # Up to here, we got the longest prefix match of suffix to idx, if matched_pos == -1 means no match

            # if next pattern character matches current string char
            if needle[ matched_pos + 1 ] == haystack[ idx ]:
                matched_pos = matched_pos + 1

            # if matched_pos is the end of pattern, we found a match!
            if matched_pos == pat_len - 1:
                print "Needle occer with shift", idx - pat_len + 1
                #matched_pos = prefix_func[ matched_pos ]

    def genPrefixFunct(self, pattern):
        """
        Generate a prefix function for pattern
        !!! you can treat this as pattern try to match itself
        """
        str_len = len(pattern)
        prefix_func = [-1]          # -1 means current not match any character
        matched_pos = -1        
        for idx in range(1,str_len):
            #   each time matched_pos is the previous position's longest prefix match position

            # while matched_pos is somewhere but current character does not match
            while matched_pos > -1 and pattern[matched_pos+1] != pattern[idx]:
                matched_pos = prefix_func[matched_pos]

            # Up to here, we got the longest prefix match of suffix to idx, if matched_pos == -1 means no match

            # if next pattern character matches current string char
            if pattern[matched_pos+1] == pattern[idx]:
                matched_pos = matched_pos + 1

            # for each idx position, we add its position which is longest suffix match prefix of pattern
            prefix_func.append(matched_pos)

        return prefix_func

# Unit Test
if __name__ == "__main__":
    inst = Solution()
    check_string = "bacbababaabcbabababca"
    pattern_string = "abababca"
    print "string to search is:", check_string
    print "pattern string is:", pattern_string
    prefix_func = inst.genPrefixFunct(pattern_string)
    print "Prefix function is:", prefix_func
    inst.strStr( check_string, pattern_string )
        
    check_string = "aaa"
    pattern_string = "aaa"
    print "string to search is:", check_string
    print "pattern string is:", pattern_string
    prefix_func = inst.genPrefixFunct(pattern_string)
    print "Prefix function is:", prefix_func
    inst.strStr( check_string, pattern_string )
