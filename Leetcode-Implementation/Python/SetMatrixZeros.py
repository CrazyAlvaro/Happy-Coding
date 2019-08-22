
class Solution:
    """
    Given a m x n matrix, if an element is 0, 
    set its entire row and column to 0. Do it in place
    """
    # @param matrix, a list of lists of integers
    # RETURN NOTHING, MODIFY matrix IN PLACE.
    def setZeroes(self, matrix):
        # use two bitvector to store row and col need to set to 0
        # set the top row and most left col as bit vector
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return
        row_num = len(matrix)
        col_num = len(matrix[0])
        col_0 = False
        row_0 = False
        for i in range(row_num):
            for j in range(col_num): 
                if matrix[i][j] == 0:
                    print 'got: '+str(i)+str(j)
                    if i == 0:
                        row_0 = True 
                    if j == 0:
                        col_0 = True
                    if i != 0 and j != 0: 
                        matrix[i][0] = 0
                        matrix[0][j] = 0

        for i in range(1, row_num):
            if matrix[i][0] == 0:
                for j in range(col_num):
                    matrix[i][j] = 0
        for j in range(1, col_num):
            if matrix[0][j] == 0:
                for i in range(row_num):
                    matrix[i][j] = 0 

        if col_0:
            for i in range(row_num):
                matrix[i][0] = 0
        if row_0:
            for j in range(col_num):
                matrix[0][j] = 0

if __name__ == "__main__":
    matrix = [[0], [1]]
    inst = Solution()
    inst.setZeroes(matrix)        
    print matrix
