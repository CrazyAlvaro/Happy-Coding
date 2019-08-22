"""
The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: 
(you may want to display this pattern in a fixed font for better legibility)

P   A   H   N
A P L S I I G
Y   I   R
And then read line by line: "PAHNAPLSIIGYIR"
"""

class Solution:
    # @return a string
    def convert(self, s, nRows):

        """
        return a ZigZag of a string
        """
        # special case
        if nRows == 1 or s == "":
            return s 

        # treat (2*nRows -2) as a step 
        step = nRows * 2 - 2    # special case, if step == 0
        length = len(s) 
        ret_str = ""
        for idx in range( nRows):
            curr_pos = idx 
            while curr_pos < length:
                # only 0 and nRows -1 add one character
                # other add two
                if idx == 0 or idx == nRows -1:
                    ret_str = ret_str + s[curr_pos] 
                    curr_pos = curr_pos + step
                else:
                    ret_str = ret_str + s[curr_pos]
                    next_pos = curr_pos + 2*(nRows - idx - 1) 
                    if  next_pos < length:
                        ret_str = ret_str + s[next_pos] 
                    curr_pos = curr_pos + step
            #print idx
            #print ret_str
        return ret_str

# Unit Test
if __name__ == "__main__":
    string = "PAYPALISHIRING"
    inst = Solution()
    print inst.convert(string, 3)
    print "PAHNAPLSIIGYIR"

    print inst.convert("A",1)

        

