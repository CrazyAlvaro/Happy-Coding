"""
Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. 
Return the sum of the three integers. You may assume that each input would have exactly one solution.

For example, given array S = {-1 2 1 -4}, and target = 1.

that is closest to the target is 2. (-1 + 2 + 1 = 2).
"""
import sys

class Solution:
    # @return an integer
    def threeSumClosest(self, num, target):
        """
        Find the three number add up closest to target
        """
        if len(num) < 3:
            return -1   #error

        num = sorted(num)
        #print num
        curr_match = sys.maxint 
        result_sum = 0
        
        for idx in range( len(num)-2 ):
            left, right= idx + 1, len(num) -1

            while left < right:
                curr_sum = num[idx] + num[left] + num[right] 
                # Update curr_match and result_sum
                if abs(curr_sum - target) < curr_match:
                    curr_match = abs(curr_sum- target)
                    result_sum = curr_sum
                    print curr_match
                
                if curr_sum > target:
                    right = right - 1
                elif curr_sum < target:
                    left = left + 1
                else:
                    return target
        
        return result_sum

# Unit Test
if __name__ == "__main__":
    #num = [-1, 2, 1, -4]
    #target = 1
    #inst = Solution()
    #print inst.threeSumClosest(num, target)

    num = [1,1,1,0]
    target = -100
    inst = Solution()
    print inst.threeSumClosest(num, target)

