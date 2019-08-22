class Solution:
    # @return a list of integers
    def grayCode(self, n):
        """
        List a number and find formular 
        """
        if n == 0:
            return [0]
        prev_list = self.grayCode(n-1)
        curr_list = prev_list[:]
        length = len(prev_list)
        for idx in range(length-1, -1, -1):
            curr_list.append( (1<<(n-1)) + prev_list[idx] )

        return curr_list 

#Unit test
if __name__ == "__main__":
    inst = Solution()
    gray_list = inst.grayCode(2)
    for num in gray_list:
        print bin(num)
