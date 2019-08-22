class Solution:
    # @return an integer
    def lengthOfLongestSubstring(self, s):
        """ find the length of longest substring w/o repeating char"""

        # Method 1: brute force check longest from each char O(N**2)

        # Method 2: use a map or array to store previous char existence
        max_len = 1
        str_len = len(s)

        if str_len < 2:
            return str_len 
        
        start, curr = 0, 1
        usedChar = set()   #if only contain limited chars, used a array char - 'a'(Python?)
        usedChar.add(s[start]) 

        while curr < str_len:
            if  s[curr] not in usedChar:
                usedChar.add( s[curr] )
                max_len = max( max_len, curr - start + 1)
            else: 
                while start < curr :
                    if s[start] == s[curr] :
                        break
                    else:
                        usedChar.remove(s[start] ) # remove unused char from set
                        start = start + 1
                start = start + 1   # increment 1 to start a new substring

            curr = curr + 1

        return max_len
                     
           


if __name__ == "__main__":
    test_str_1 = "abcabcbb"
    test_str_2 = "bbbb"

    inst = Solution()
    print inst.lengthOfLongestSubstring(test_str_1), " expect: 3"
    print inst.lengthOfLongestSubstring(test_str_2), " expect: 1"
