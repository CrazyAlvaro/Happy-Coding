class Solution:
    # @return a list of lists of integers
    # k numbers from 1 ... n
    def __init__(self):
        self.combinations = list()

    def combine(self, n, k):
        """ get list of lists of k numbers from 1 ~ n"""
        nums = []
        self.combineHelp( 1, n, k, nums)
        return self.combinations
        
    def combineHelp(self, curr, n, k, nums):
        if k == 0:
            #new_nums = [ idx for idx in nums]
            new_nums = nums[:]  # copy list
            #print new_nums
            self.combinations.append(new_nums)
            return
        if curr > n:
            return 

        nums.append(curr)
        self.combineHelp( curr + 1, n, k - 1, nums)
        nums.pop()
        self.combineHelp( curr + 1, n, k, nums)
        

if __name__ == "__main__":
    inst = Solution()
    res = inst.combine(5,2)
    print res
