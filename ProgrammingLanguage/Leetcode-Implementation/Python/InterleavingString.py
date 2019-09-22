class Solution:
    
    def isInterleave(self, s1, s2, s3):
        """
        recursive method
        """

        """
        when you come up with a recursive way

        Think about whether you can use a Dynamic Programming
        method to solve it

        """
        # make sure len(s1) + len(s2) == len(s3)

        if len(s1) + len(s2) != len(s3):
            #print "Invalid input"
            return False
        if len(s1) == 0:
            return  s2==s3
        elif len(s2) == 0:
            return  s1==s3
        else:
            pass


        # create a two-dimensional matrix with length (len(s1) + 1) * (len(s2) + 1)
        inter_matrix = [ [ False for _ in range(len(s2) + 1) ] for _ in range( len(s1) + 1) ]
        inter_matrix[0][0] = True
        print inter_matrix
        for idx in range(1, len(s1) + 1):
            inter_matrix[idx][0] = inter_matrix[idx-1][0] and s1[idx-1] == s3[idx-1]
        
        for idx in range(1, len(s2) + 1):
            inter_matrix[0][idx] = inter_matrix[0][idx-1] and s2[idx-1] == s3[idx-1] 

        for row in range(1, len(s1) + 1):
            
            for col in range(1, len(s2) + 1):
                inter_matrix[row][col] = ( inter_matrix[row-1][col] and (s1[row-1] == s3[row-1+col]) ) \
                    or (inter_matrix[row][col-1] and (s2[col-1] == s3[row-1+col]) )

        print inter_matrix
        return inter_matrix[len(s1)][len(s2)]                

if __name__ == "__main__":
    inst = Solution()
    #print inst.isInterleave("aabcc", "dbbca", "aadbbcbcac"), "expect: True"
    #print inst.isInterleave("aabcc", "dbbca", "aadbbbaccc"), "expect: False"
    #print inst.isInterleave("", "", "")                    , "expect: True"
    #print inst.isInterleave("a","","a")                    , "expect: True"
    print inst.isInterleave("aa","ab","abaa")              , "expect: True"
