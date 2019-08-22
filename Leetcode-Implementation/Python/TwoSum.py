class Solution:
    # @return a tuple, (index1, index2)
    def twoSum(self, num, target):
        """ two number add up to target"""
        # non-zero based
        visited = dict()
        for idx in range(len(num)):
            if (target - num[idx]) in visited:
                return (visited[target-num[idx]] + 1, idx+1)
            
            visited[num[idx]] = idx
