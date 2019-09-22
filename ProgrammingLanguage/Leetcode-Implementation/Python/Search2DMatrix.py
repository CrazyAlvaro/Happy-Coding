class Solution:
    # @param matrix, a list of lists of integers
    # @param target, an integer
    # @return a boolean
    def searchMatrix(self, matrix, target):
        # two binary search                        
        if len(matrix) == 0 or len(matrix[0]) == 0:
            return False

        row = len(matrix)
        col = len(matrix[0])

        # binary search for row number
        lower, upper = 0, row - 1
        curr = (lower + upper)/2
        # print str(lower) + " and " + str(upper)
        print str(curr)
        while curr + 1 < row :
            if matrix[curr][0] <= target and target < matrix[curr+1][0] :
                break   # curr is the potential row position
            if matrix[curr][0] < target and matrix[curr+1][0] <= target :
                lower = curr + 1
            if matrix[curr][0] > target and matrix[curr+1][0] > target :
                upper = curr
            if curr == (lower+upper)/2: 
                break
            curr = (lower+upper)/2

        print "row number got is:" + str(curr)
        if matrix[curr][0] > target:    return False
   
        # binary search for col number 
        row = curr
        lower, upper = 0, col - 1
        curr = (lower + upper)/2
        while curr < col:
            if matrix[row][curr] == target:
                return True
            if matrix[row][curr] >  target:
                upper = curr
            if matrix[row][curr] <  target:
                lower = curr 
            if curr == (lower + upper)/2:   ### !!! (1+2)/2 = 1 upper bound may not reach
                break
            curr = (lower+upper)/2
        if curr + 1 < col and matrix[row][curr+1] == target:
            return True
        print "col number got is:" + str(curr)

        return False

if __name__ == "__main__":
    matrix = [[1,3]]
    target = 3
    inst = Solution()
    ret = inst.searchMatrix(matrix, target)
    print ret            
             

