# distinct integers, return all subsets

#class Solution:
#    # @param S, a list of integer
#    # @return a list of lists of integer
#    def subsets(self, S):
#        """ dynamic programming thinking way, add one element each time"""
#        result = [[]]
#        for integer in S:
#            # each time we have a new element we have original list and with integer
#            result = result + [ [integer] + subset for subset in result ]
#
#        return result




class Solution:
    # @param S, a list of integer
    # @return a list of lists of integer
    def subsets(self, S):
        subset = []
        self._subsets_=[]
        S.sort()           # not in Descending order
        for count in range(len(S) + 1):
            self.generateSubsets( S, count, 0, subset)
        
        return self._subsets_

    def generateSubsets(self, S, remain_count, pos, subset ):
        """
        S, list of integer, remain_count, number of integer need to be added
        pos, current position in list, subset, current subset
        recursive function to generate subset
        return nothing
        """
        if remain_count == 0:
            self._subsets_.append( subset[:] )
            return

        for idx in range( pos, len(S) ):
            subset.append( S[idx] )
            self.generateSubsets( S, remain_count - 1, idx + 1, subset )
            subset.pop() 
            

if __name__ == "__main__":
    inst = Solution()
    set = [1,1,2]
    set = inst.subsets(set)
    print set
        
