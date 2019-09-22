# Given an array of integers, every element appears twice except for one. Find that single one.
# 
# Note:
# Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory? 

class Solution:
    # @param A, a list of integer
    # @return an integer
    def singleNumber(self, A):
        # XOR each number, the final number is the one only appears once
        
        # reduce(function, iterablt[, initializer])
        #   apply function of two arguments cumulatively to the items of iterable

        # operator.xor(a, b)  return the bitwise exclusive or of a and b
        return reduce(operator.xor, A)
