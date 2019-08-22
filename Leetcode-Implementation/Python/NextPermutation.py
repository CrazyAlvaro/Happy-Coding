# Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
# 
# If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
# 
# The replacement must be in-place, do not allocate extra memory.
# 
# Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
# 1,2,3  1,3,2
# 3,2,1  1,2,3
# 1,1,5  1,5,1


class Solution:
    # @param num, a list of integer
    # @return a list of integer
    def nextPermutation(self, num):
        """
            @param num
            @return list of int
            # approach: find the next posistion not in ascending order from the right-most
            # sort the sub list and get the first one bigger than the old one insert it to the front
        """
        self._num_list_ = num 
        index = self.nextSwapPosition()
        if index == -1:
            return sorted(self._num_list_)
        value = self._num_list_[index]
        print index, value
        self.sortSublist( index )
        print self._num_list_
        print self._num_list_
        self.insertNum( index, value )
        return self._num_list_
        

    def sortSublist(self, idx):
        """ sort the self._num_list_ list from the given index to the end, return nothing, sort in place"""
        if idx >= len(self._num_list_) - 1 or idx < 0:
            return
       
        self._num_list_[idx:len(self._num_list_)] = sorted( self._num_list_[idx:len(self._num_list_)] )


#    def isBiggestNumList(self, self._num_list_):
#        """ check if the self._num_list_ list already the biggest number, not possible to increase, return a boolean """

    def nextSwapPosition(self):
        """ return next index of list not in ascending order from the end
            return positive if exist, otherwise return -1
            @param self._num_list_, a list of integer
            @return int 
        """
        for idx in range(len(self._num_list_) - 2, -1, -1):
            if self._num_list_[idx] < self._num_list_[idx + 1]:
                return idx 
        
        return -1   # not found

    def insertNum(self, idx, original):
        """ from index to the end of the self._num_list_ list, find the first one bigger than original value and insert
            that self._num_list_ber to original the index position, return True if succeed False if failed
        """
        original_pos = idx 
        if idx <0 or idx >= len(self._num_list_):
            return False
        
        for index in range( idx, len(self._num_list_) ):
            if self._num_list_[index] > original:
                value = self._num_list_[index]
                self._num_list_.pop(index)
                self._num_list_.insert(original_pos, value)
                return True

        return False    # not found

if __name__ == "__main__":
    test_case1 = [1,2,3]
    test_case2 = [3,2,1]
    test_case3 = [1,3,2]
    test_case4 = [3,2,2]

    inst = Solution()
    #print "Test 1:", test_case1
    #print inst.nextPermutation( test_case1 )
    #print "Test 2:", test_case2
    #print inst.nextPermutation( test_case2 )
    print "Test 3:", test_case3
    print inst.nextPermutation( test_case3 )
    #print "Test 4:", test_case4
    #print inst.nextPermutation( test_case4 )
