class Solution:
    # @param digits, a list of integer digits
    # @return a list of integer digits
    def plusOne(self, digits):
        if len(digits) == 0:    return [1]
        
        pos = len(digits) - 1
        carry = 1
        while pos >= 0 and carry == 1:
            temp = digits[pos] + carry
            carry = int(temp /10 )
            digits[pos] = temp%10
            pos -= 1
        if carry == 1:
            digits.insert(0, carry)
        return digits 
