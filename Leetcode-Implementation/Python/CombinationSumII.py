

# another solution can count the occurence of each number, then use the same method for combinationSum
class Solution:
    # @param candidates, a list of integers
    # @param target, integer
    # @return a list of lists of integers
    def combinationSum2(self, candidates, target):
        candidates = sorted(candidates)
        self._result_ = list()
        self.getCombinationSum(candidates, target, 0, [])
        
        # remove duplicates, first map list of list to tuple, create set of that, then map tuple back to list
        self._result_ = map(list, set( map(tuple,self._result_) ) )
        return self._result_

    def getCombinationSum(self, candidates, target, index, comb_list):
        """ 
        candidates list of integer, target remaining value
        index position in candidates, comb_list current list
        """

        if target == 0:
            new_list = comb_list[:]
            self._result_.append(new_list)
            return

        # either out of range or target to small, candidates sorted
        if index == len(candidates) or target < candidates[index]:
            return

        # skip current position
        self.getCombinationSum(candidates, target, index + 1, comb_list)
        
        comb_list.append( candidates[index] )
        # target >= candidates[index] previous checked
        self.getCombinationSum(candidates, target - candidates[index], index + 1, comb_list) 
        comb_list.pop()


if __name__ == "__main__":
    """unit test"""

    inst = Solution()
    candidates = [10, 1, 2, 7, 6, 1, 5]
    target = 8
    print inst.combinationSum2( candidates, target )
