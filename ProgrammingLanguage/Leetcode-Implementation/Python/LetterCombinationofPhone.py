class Solution:
    # @return a list of strings, [s1, s2]
    def letterCombinations(self, digits):
        """
        Get a list of possible string from a digits list
        """
        # Create a template string
        phone_list = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"]
        

        # could possible use a zip() function 
        # if use a dict, then dict().get(key,"") function could be used, as the second argument is default return value
        combinations = [""]
        for digit in digits:
            letters = phone_list[ int(digit) ]
            if len(letters) == 0:   continue        # skip other than 2~9
            combinations = [ prefix + letter for prefix in combinations for letter in letters ]
        
        return combinations

## Create a global dict
#digits_dict = { '1': ""    , 
#                '2': "abc" ,
#                '3': "def" ,
#                '4': "ghi" ,
#                '5': "jkl" ,
#                '6': "mno" ,
#                '7': "pqrs",
#                '8': "tuv" ,
#                '9': "wxyz" }
#
#
#class Solution:
#    # @return a list of strings, [s1, s2]
#    def letterCombinations(self, digits):
#        """
#        Get a list of possible string from a digits list
#        """
#        # Create a template string
#        generate_str = ""
#        for _ in range(len(digits)): 
#            generate_str = generate_str +  "a" 
#
#        # use naive iterating method
#        print generate_str
#        for idx in range( len(digits) ):
#            #temp_str = self.getString( digits[idx] )
#            #temp_str = digits_dict[ int(digits[idx]) ]
#            temp_str = digits_dict[ digits[idx] ]
#            
#
#    def getString(self, digit):
#        return digits_dict[digit] 


if __name__ == "__main__":

    #print digits_dict
    inst = Solution()
    #print inst.letterCombinations("12")
    #print inst.letterCombinations("123")
    print inst.letterCombinations("1234")
