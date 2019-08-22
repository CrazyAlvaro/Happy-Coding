class Solution:
    # @return a list of lists of integers
    def generate(self, numRows):
        # initialize two dimensional matrix
        matrix = []
        
        for i in range (numRows):
            curr_row = []
            for j in range (i + 1):
                if j == 0 or j == i:
                    curr_row.append(1)
                    continue
                curr_row.append( matrix[i-1][j-1] + matrix[i-1][j] )
            matrix.append( curr_row )
        
        return matrix

if __name__ == "__main__":
    inst = Solution()
    matrix = inst.generate(5)
    print matrix
   
