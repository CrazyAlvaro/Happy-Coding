class Solution:
    # @param A, a list of integer
    # @return an integer
    def singleNumber(self, A):
        """
        Find the only one number not appear three times
        """
        # three variable used to store each bit's count%3
        # assume number is a 32-bit variable, intially all bit%3 == 0
        ones, twos, threes = 0, 0, ~0
        
        for number in A:
            twos = twos & (~number) | (ones & number)
            ones = ones & (~number) | (threes & number)
            threes = ~(twos | ones)                     # each bit either appers ones, twos, or threes%3==0 

        return ones 

if __name__ == "__main__":
    test_list = [13, 13, 13, 42, 42, 42, 16 ]
    test_list = [-2,-2,1,1,-3,1,-3,-3,-4,-2]
    inst = Solution()
    print inst.singleNumber(test_list)

