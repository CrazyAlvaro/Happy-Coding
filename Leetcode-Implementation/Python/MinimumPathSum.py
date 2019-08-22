# Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

class Solution:
    # @param grid, a list of lists of integers
    # @return an integer
    def minPathSum(self, grid):
        if len(grid) < 1:
            return 0
        row = len(grid)
        col = len(grid[0])
        for i in range(row):
            for j in range(col):
                if j == 0 and i == 0:
                    continue
                elif j == 0:
                    grid[i][j] = grid[i-1][j] + grid[i][j]
                elif i == 0:
                    grid[i][j] = grid[i][j-1] + grid[i][j]                    
                else: """ i != 0 and j != 0"""
                    grid[i][j] = min(grid[i-1][j], grid[i][j-1]) + grid[i][j]
        return grid[row-1][col-1]


