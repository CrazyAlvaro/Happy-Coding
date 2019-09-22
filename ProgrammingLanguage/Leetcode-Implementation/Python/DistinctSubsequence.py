
class Solution:
    # @return an integer
    def numDistinct(self, S, T):
        # get number of distince subsequence T of S
        
        # use a two dimensional matrix to represent 
        # up to position index_s in S, how many distince
        # subsequence are their match up to index_t in T
        # matrix[index_s][index_t]
        # matrix[x][0] = 1, every

        # Dynamic Programming method
        # two-d mattrix represent mattrix[s_idx][t_idx] up to s_idx 
        # how many distinct matched subsequence 
        mattrix =[[0 for _ in range(len(T))] for _ in range(len(S))]       
        
        
        


# Time limit exceeded
#class Solution:
#    # @return an integer
#    def numDistinct(self, S, T):
#        # get number of distince subsequence T of S
#        self._count_ = 0 
#        self.checkDistince(S, 0, T, 0)
#        return self._count_
#
#    def checkDistince(self, string, str_pos, pattern, pat_pos):
#        if len(string) - str_pos < len(pattern) - pat_pos:
#            return
#        
#        if pat_pos == len(pattern):
#            self._count_ += 1
#            return
#
#        for idx in range( str_pos, len(string) - len(pattern) + pat_pos + 1 ):
#            if string[idx] == pattern[pat_pos]:
#                self.checkDistince( string, idx + 1, pattern, pat_pos + 1)

if __name__ == "__main__":
    inst = Solution()
    S = "rabbbit" 
    T = "rabbit"
    print inst.numDistinct(S, T)
        

