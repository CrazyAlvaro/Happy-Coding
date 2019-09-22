# From top left to lower right, how many unique paths

class Solution:
    # @return an integer
    def uniquePaths(self, m, n):
        
        line = [ 1 for x in range(n) ]
        for i in range(1, m):
            for j in range(1, n):
                line[j] = line[j] + line[j-1]
        return line[n-1]

if __name__ == "__main__":
    inst = Solution()
    ret = inst.uniquePaths(4, 5)
    print ret
