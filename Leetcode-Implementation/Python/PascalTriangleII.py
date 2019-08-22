class Solution:
    """ for Leetcode Pascal's Triangle II"""
    # @return a list of integers
    def getRow(self, rowIndex):
        """ get the rowIndex th row of Pascal Triangle"""
        if rowIndex == 0:   return [1]
        if rowIndex == 1:   return [1, 1]
        row = [1, 1]
        for _ in range(1, rowIndex):
            next_row = [1]
            for idx in range(len(row)-1):
                next_row.append( row[idx] + row[idx+1] )
            next_row.append(1)
            row = next_row
        return row

if __name__ == "__main__":
    inst = Solution()
    print inst.getRow(1)
    print inst.getRow(2)
    print inst.getRow(3)
    print inst.getRow(4)
    print inst.getRow(5)
    print inst.getRow(6)
            
        
