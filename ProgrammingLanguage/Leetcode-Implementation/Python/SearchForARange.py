# Given a sorted array of integers, find the starting and ending position of a given target value.
# 
# Your algorithm's runtime complexity must be in the order of O(log n).
# 
# If the target is not found in the array, return [-1, -1].
# 
# For example,
# Given [5, 7, 7, 8, 8, 10] and target value 8,
# return [3, 4].


class Solution:
    # @param A, a list of integers
    # @param target, an integer to be searched
    # @return a list of length 2, [index1, index2]
    def searchRange(self, A, target):
        """
        Find the range of target value, multiple target value exist
        Variance of Binary Search
        """

        # The idea is to search for the left bound and right bound
        
        # Search for left bound
        start, end = 0, len(A) - 1
        while start < end:
            middle = (start + end)/2
            if A[middle] < target:
                start = middle + 1
            else:
                end = middle

        # start == end
        #print start, end
        if A[end] != target:    # Target not found
            return [-1,-1]

        left_bound = end
        
        # Search For right bound
        start, end = left_bound, len(A) - 1
        while start < end:
            middle = (start + end)/2        # key point, middle could == start, if end = start + 1
            if A[middle] > target:
                end = middle 
            else:
                start = middle + 1

        # if A[end] > target, end - 1 is the right bound
        if A[end] == target:
            right_bound = end
        else:
            right_bound = end - 1
        return [left_bound, right_bound]

# Unit Test
if __name__ == "__main__":
    inst = Solution()
    A = [5, 7, 7, 8, 8, 10]
    print inst.searchRange(A,8)

        
