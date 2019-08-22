####################
# Original Solution

#class Solution:
#    # @param a, a string
#    # @param b, a string
#    # @return a string
#    def addBinary(self, a, b):
#        """
#        Add two binary string 
#        """
#        carry = 0 
#        ret_str = "" 
#        length = min( len(a), len(b) )
#
#        for idx in range(1, length + 1):
#            temp_sum = carry + int(a[-idx]) + int(b[-idx])
#            
#            if temp_sum == 0:
#                carry = 0
#                ret_str = "0" + ret_str
#            elif temp_sum == 1:
#                carry = 0
#                ret_str = "1" + ret_str
#            elif temp_sum == 2:
#                carry = 1
#                ret_str = "0" + ret_str
#            elif temp_sum == 3:
#                carry = 1
#                ret_str = "1" + ret_str
#            else:
#                pass
#
#        if length < len(a):
#            for idx in range( length + 1, len(a) + 1):
#                temp_sum = carry + int(a[-idx])
#                if temp_sum == 0:
#                    carry = 0
#                    ret_str = "0" + ret_str
#                elif temp_sum == 1:
#                    carry = 0
#                    ret_str = "1" + ret_str
#                elif temp_sum == 2:
#                    carry = 1
#                    ret_str = "0" + ret_str
#                else:
#                    pass
#
#        if length < len(b):
#            for idx in range( length + 1, len(b) + 1):
#                temp_sum = carry + int(b[-idx])
#                if temp_sum == 0:
#                    carry = 0
#                    ret_str = "0" + ret_str
#                elif temp_sum == 1:
#                    carry = 0
#                    ret_str = "1" + ret_str
#                elif temp_sum == 2:
#                    carry = 1
#                    ret_str = "0" + ret_str
#                else:
#                    pass
#
#        if carry == 1:
#            ret_str = "1" + ret_str
#        return ret_str

####################
# revised solution

#class Solution:
#    # @param a, a string
#    # @param b, a string
#    # @return a string
#    def addBinary(self, a, b):
#        """
#        Add two binary string 
#        """
#        ret_num = ""
#
#        length = max( len(a), len(b) )
#        
#        ####################################################
#        # extend either a or b to max(len(a), len(b))
#        # 
#        # very creative way
#        ####################################################
#        while len(a) < length: a = "0" + a
#        while len(b) < length: b = "0" + b
#                
#        carry = 0
#
#        for idx in range(1, length + 1):
#            int_a, int_b = int(a[-idx]), int(b[-idx])
#            curr_val = int_a ^ int_b ^ carry
#            carry = int_a & int_b | (int_a | int_b) & carry
#
#            if curr_val == 1:
#                ret_num = "1" + ret_num
#            else:
#                ret_num = "0" + ret_num
#
#        if carry:
#            ret_num = "1" + ret_num
#
#        return ret_num
             
###########################
# In a python way

class Solution:
    # @param a, a string
    # @param b, a string
    # @return a string
    def addBinary(self, a, b):
        """
        Add two binary string 
        """
        # add two number as binary and convert to binary format
        num_str = bin( int(a,2) + int(b,2) )

        # num_str is like 0b010011, we want the second part
        ret_num = num_str.split("b")[1] 

        return ret_num


# Unit test
if __name__ == "__main__":
    inst = Solution()
    number_1 = "1101010"
    number_2 = "100001101110"
    ret_num = inst.addBinary(number_1, number_2)
    print number_1, "+", number_2, "=",ret_num

    number_1 = "0"
    number_2 = "0"
    ret_num = inst.addBinary(number_1, number_2)
    print number_1, "+", number_2, "=",ret_num

    number_1 = "1"
    number_2 = "1"
    ret_num = inst.addBinary(number_1, number_2)
    print number_1, "+", number_2, "=",ret_num

