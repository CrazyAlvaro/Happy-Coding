class Solution:
    # @param an integer
    # @return a list of string
    def generateParenthesis(self, n):
        ret_strs = []
        paren_str = '('
        self.generateHelp( ret_strs, paren_str, 1, n -1 )
        return ret_strs
                    

    def generateHelp(self, ret_strs, paren_str, left_count, n):
        if n == 0 and left_count == 0:
            ret_strs.append( paren_str )
            return 

        if left_count > 0:
            new_str = paren_str + ')'
            self.generateHelp( ret_strs, new_str, left_count - 1, n)
        if n > 0:
            self.generateHelp( ret_strs, paren_str + '(', left_count + 1, n - 1 )


if __name__ == "__main__":
    inst = Solution()
    ret = inst.generateParenthesis( 3 )
    print ret
