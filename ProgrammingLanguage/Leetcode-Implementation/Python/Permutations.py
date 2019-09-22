class Solution:
    # @param num, a list of integer
    # @return a list of lists of integers
    def permute(self, num):
        res = [] 
        self.permuteHelp(num, 0, res)
        return res
         
    def permuteHelp(self, num, start, res):
        if start == len(num) - 1:
            new_num = list(num)     # create a new list
            res.append( new_num )
            return
        
        self.permuteHelp( num, start + 1, res)  
        for i in range(start + 1, len(num)):
            num[i], num[start] = num[start], num[i]                 
            self.permuteHelp( num, start + 1, res)
            num[i], num[start] = num[start], num[i]                 







##################################
#
#   This class won't change num

#class Solution:
#    # @param num, a list of integer
#    # @return a list of lists of integers
#    def permute(self, num):
#        res = [] 
#        self.permuteHelp(num, 0, res)
#        print res
#        return res
#         
#    def permuteHelp(self, num, start, res):
#        if start == len(num) - 1:
#            #print num
#            res.append( num )
#            print res
#            return
#        
#        self.permuteHelp( num, start + 1, res)  
#        for i in range(start + 1, len(num)):
#            num[i], num[start] = num[start], num[i]                 
#            #print num
#            self.permuteHelp( num, start + 1, res)
#            num[i], num[start] = num[start], num[i]                 
                           
                           
if __name__ == "__main__":
    num = [1, 2, 3]
    inst = Solution()
    res = inst.permute( num )
    print res                            
