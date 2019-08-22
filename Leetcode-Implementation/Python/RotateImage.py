class Solution:
    # @param matrix, a list of lists of integers
    # @return a list of lists of integers
    def rotate(self, matrix):
        # rotate in place, each circle 
        n = len(matrix)
        for i in range(n):
            end = n - i - 1
            #print matrix
            if i >= end: break 
            for j in range(i,end):
                #print "inside loop for j range(end)" + str(i) + str(j)
                temp = matrix[i][j]
                matrix[i][j] = matrix[n-j-1][i]
                matrix[n-j-1][i] = matrix[n-i-1][n-j-1]
                matrix[n-i-1][n-j-1] = matrix[j][n-i-1]              
                matrix[j][n-i-1] = temp
                #print matrix

        return matrix
    
class Solution_other:
    def rotate(self, matrix):
        #print (*matrix)
        print "\n\n"
        print 'zip(*matrix)'
        print zip(*matrix)
        print '\n\n for x in zip(*matrix)'
        for x in zip(*matrix):
            print x
        return [list(reversed(x)) for x in zip(*matrix)]    
        
if __name__ == "__main__":
    mat = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
    inst = Solution_other()
    mat = inst.rotate(mat)
    print "\n\n final matrix"
    print mat
