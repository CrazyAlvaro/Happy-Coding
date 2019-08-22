# Given an array of non-negative integers, you are initially positioned at the first index of the array.
# 
# Each element in the array represents your maximum jump length at that position.
# 
# Your goal is to reach the last index in the minimum number of jumps.
# 
# For example:
# Given array A = [2,3,1,1,4]
# 
# The minimum number of jumps to reach the last index is 2. (Jump 1 step from index 0 to 1, then 3 steps to the last index.)

class Solution:
    # @param A, a list of integers
    # @return an integer
    def jump(self, A):
        """
        Return the minimum number of jump to last position
        """
        
        # think about for each step, what's the furtherest distance can get
       
        # curr_dist is the most distance for current number of steps
        # max_dist is the maximum potential distance for one step more
        curr_dist, max_dist = 0, 0
        steps = 0
        
        curr_position = 0
        while True:
            if curr_dist >= len(A) - 1:
                return steps

            while curr_position <= curr_dist:
                max_dist = max( max_dist, curr_position + A[curr_position] ) 
                curr_position = curr_position + 1
                
            steps = steps + 1 
            # No forwarding
            if max_dist <= curr_dist:
                return -1
            curr_dist = max_dist

# Unit Test
if __name__ == "__main__":
    A = [2,3,1,1,4]
    inst = Solution()
    print inst.jump(A)
            
        
