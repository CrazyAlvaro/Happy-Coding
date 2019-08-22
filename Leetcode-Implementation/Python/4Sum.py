# Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.
# 
# Note:
#     Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a  b  c  d)
#     The solution set must not contain duplicate quadruplets.
#     For example, given array S = {1 0 -1 0 -2 2}, and target = 0.
# 
#     A solution set is:
#     (-1,  0, 0, 1)
#     (-2, -1, 1, 2)
#     (-2,  0, 0, 2)

class Solution:
    # @return a list of lists of length 4, [[val1,val2,val3,val4]]
    def fourSum(self, num, target):
        """
        find a list of lists of length 4 sum to target
        """
        # use hash method
        target_hash = {}
        # since may contain duplicates
        ret_set=set() 
         
        num = sorted(num)
        for fir in range( len(num)-1 ):
            for sec in range( fir + 1, len(num) ):
                key = num[fir] + num[sec]
                if key in target_hash:
                    target_hash[key].append( (fir,sec) )    # append pair as a tuple of positions
                else:
                    target_hash[key] =[ (fir, sec) ]        # as a list of tuple, may have multiple pair to one key
        
        #print target_hash 
        for fir in range( len(num)-3 ):
            for sec in range( fir + 1, len(num) -2):
                if num[fir] + num[sec] > (target/2):
                    break                                   # won't have another two value sum == target, already sorted
                # just get pos greater then "sec"
                key = target - num[fir] - num[sec]
                if key in target_hash:                      # if exist such key
                    for pos_pair in target_hash[key]:
                        if pos_pair[0] > sec:   ret_set.add( (num[fir], num[sec], num[pos_pair[0]], num[pos_pair[1]] ))
            
        return [ list(combination) for combination in ret_set ] 

#class Solution:
#    # @return a list of lists of length 4, [[val1,val2,val3,val4]]
#    def fourSum(self, num, target):
#        """
#        find a list of lists of length 4 sum to target
#        """
#        # sort integer list
#        num = sorted(num)
#        # No duplicates, O(n**3) method
#        
#        ret_lists = []
#        length = len(num) 
#        if length < 4:
#            return ret_lists
#        #print num 
#        first = 0
#        while first < length - 3:
#            second = first + 1        
#            while second < length - 2:
#                #print first, second
#                third, fourth= second + 1, length - 1
#                while third < fourth:
#                    #print first, second, third, fourth
#                    potential_sol = [ num[first], num[second], num[third], num[fourth] ]
#                    if sum(potential_sol) == target:
#                        ret_lists.append( potential_sol )                    
#                        third = self.increaseIter(num, third)
#                        fourth = self.decreaseIter(num, fourth)
#                        #print potential_sol
#                    elif sum(potential_sol) < target:
#                        third = self.increaseIter(num, third)
#                    else:
#                        fourth = self.decreaseIter(num, fourth)
#                second = self.increaseIter(num, second)
#            first = self.increaseIter(num, first)
#        return ret_lists
#
#    def increaseIter(self, num, idx):
#        """
#        increase idx until not equals to current
#        """
#        idx = idx + 1
#        while idx < len(num) and num[idx-1] == num[idx]:
#            idx = idx + 1
#        return idx
#    
#    def decreaseIter(self, num, idx):
#        """
#        decrease idx until not equal to prev
#        """
#        idx = idx - 1
#        while idx >= 0 and num[idx] == num[idx + 1]:
#            idx = idx - 1
#        return idx

if __name__ == "__main__":
    test_list = [ 1, 0, -1, 0, -2, 2 ]
    inst = Solution()
    ret_list = inst.fourSum(test_list, 0)
    print ret_list

