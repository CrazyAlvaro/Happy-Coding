import sys

class Solution:
    # @return an integer
    def atoi(self, str):
        """
        convert string to integer
        """

        num = 0
        #############################
        # discard whitespace !!!
        idx = 0
        while str[idx] == " ": idx += 1
        str = str[idx:]
        
        # if no valid input
        if len(str) == 0:
            return num 

        # optional plus or minus sign, interprets them as numerical value
        positive = True
        if str[0] == "+":
            str = str[1:] 
        elif str[0] == "-":
            str = str[1:] 
            positive = False
        elif str[0] >= "0" or str[0] <= "9":
            pass
        else:
            return 0        # invalid input

        for idx in range(len(str)):
            # discard non numerical char after numeric chars
            if str[idx] < "0" or str[idx] >"9": # invalid char
                break

            num *= 10
            num += (ord(str[idx]) - ord("0"))
        
        if not positive:
            num = -num
        
        # if exceed MAX_INT MIN_INT, 
        #TODO leetcode INT_MAX not equals to this
        if num > sys.maxint:
            return sys.maxint 
        elif num < -sys.maxint -1:
            return  -sys.maxint - 1
        else:
            return num


# Unit test
if __name__ == "__main__":
    inst = Solution()
    test_num = "234384343434348888888443435344343434"
    print test_num, "to:", inst.atoi(test_num)
    test_num = "-234384343434348888888443435344343434"
    print test_num, "to:", inst.atoi(test_num)
    test_num = "c4343434"
    print test_num, "to:", inst.atoi(test_num)
    test_num = "       243434"
    print test_num, "to:", inst.atoi(test_num)
    test_num = "       -243434"
    print test_num, "to:", inst.atoi(test_num)
    test_num = "       +243434"
    print test_num, "to:", inst.atoi(test_num)





