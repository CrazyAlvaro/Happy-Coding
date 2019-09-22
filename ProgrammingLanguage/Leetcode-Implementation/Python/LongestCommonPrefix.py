class Solution:
    # @return a string
    def longestCommonPrefix(self, strs):
        """
        Find the longest common prefix among an array of strings
        """
        if len(strs) == 0:
            return ""

        sorted(strs)        # sort string array
        prefix = strs[0]
        
        for idx in range(1, len(strs) ):
            prefix = self.findCommonPrefix( prefix, strs[idx])

        return prefix

    def findCommonPrefix(self, fir_str, sec_str):
        
        idx = 0
        while idx < min(len(fir_str), len(sec_str)):
            if fir_str[idx] != sec_str[idx]:
                break
            idx = idx + 1

        return fir_str[0:idx]


# Unit Test
if __name__ == "__main__":
    strs = ["abced", "abcde", "abc"]
    inst = Solution()
    print inst.longestCommonPrefix(strs)
