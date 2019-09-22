class Solution:
    # @param A, a list of integers
    # @return an integer
    def trap(self, A):
        """ return the total water able to trap"""
        if len(A) == 0:
            return 0

        # the idea is that calculate the most possible water
        # could trap and remove the already blocked one

        curr_low_level, total_volume, blocks, left, right = 0, 0, 0, 0, len(A) - 1

        while left <= right:
            
            curr_min = min(A[left], A[right])
            if curr_min > curr_low_level:
                # add to total_volume
                total_volume += (curr_min - curr_low_level )*(right - left + 1)
                curr_low_level = curr_min 
                
            # increment lower counter of the two
            if A[left] <= A[right]:
                blocks += A[left]
                left += 1
            else:
                blocks += A[right]
                right -= 1

        return total_volume - blocks

        
                    
