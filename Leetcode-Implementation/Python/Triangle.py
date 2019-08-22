# Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.
# 
# For example, given the following triangle
# [
#      [2],
#     [3,4],
#    [6,5,7],
#   [4,1,8,3]
# ]
# The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).
# 
# Note:
# Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle.

class Solution:
    # @param triangle, a list of lists of integers
    # @return an integer
    def minimumTotal(self, triangle):
        """ find the minimum path from top to bottom"""
        # assume triangle is well formatted

        # suppose to check triangle's format
        if len(triangle) == 0:
            return 0 

        # using bottom up dymamic way to calc the minimu        
        for idx in range( len(triangle) - 2,  -1, -1):
            curr_row = triangle[idx] 

            for col in range(len(curr_row)):
                curr_row[col] = min( triangle[idx+1][col], triangle[idx+1][col+1]) \
                     + curr_row[col]
        
        return  triangle[0][0]

if __name__ == "__main__":
    triangle = [ [2], [3,4], [6,5,7], [4,1,8,3] ]
    inst = Solution()
    print inst.minimumTotal(triangle)
