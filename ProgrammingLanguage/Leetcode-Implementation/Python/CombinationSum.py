class Solution:
    # @param candidates, a list of integers
    # @param target, integer
    # @return a list of lists of integers
    def combinationSum(self, candidates, target):
        """ get all combinations sum to target"""

        candidates = sorted(candidates)
        self._result_ = list()
        self.getCombinationSum( candidates, target, 0, [])
        return self._result_
        
    def getCombinationSum(self, candidates, target, index, comb_list):
        """
        candidates list of integers, target, integer, 
        index: position in candidates, comb_list: current list 
        return nothin
        """
        if target == 0:
            new_list = comb_list[:]         #create a new copy of list
            self._result_.append( new_list)
            return

        if index == len(candidates) or candidates[index] > target:
            return
        
        # include zero current number
        self.getCombinationSum(candidates, target, index + 1, comb_list)
        
        # include from one to most current number
        count = 1
        while count * candidates[index] <= target:
            comb_list.append( candidates[index] )
            self.getCombinationSum(candidates, target - count* candidates[index], index + 1, comb_list)
            count = count + 1
       
        # clear current recursive function to comb_list's change, note count start from 1
        for _ in range(1, count):
            comb_list.pop()


if __name__ == "__main__":
    """unit test"""
    inst = Solution()
    candidates = [6,7,2,3]
    target = 7
    print inst.combinationSum(candidates, target)
        

