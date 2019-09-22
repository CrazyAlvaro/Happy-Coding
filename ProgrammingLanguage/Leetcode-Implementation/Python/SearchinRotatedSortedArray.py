class Solution:
    # @param A, a list of integers
    # @param target, an integer to be searched
    # @return an integer, -1 no exist, index otherwise
    def search(self, A, target):
        """
        using binary search
        Also able to use two pos in iterative way other recursive
        """
        self.result = -1
        self.searchHelp( A, 0, len(A)-1, target)
        return self.result

    def searchHelp(self, integer_list, start, end, target):
        middle = ( start + end )/2  
        
        if integer_list[middle] == target:
            self.result = middle
            return

        if start > end:
            return
        
        # target value only possible to exist in one part
        # left part sorted
        if integer_list[start] <= integer_list[middle]:
            if integer_list[start] <= target and target < integer_list[middle]:
                self.searchHelp( integer_list, start, middle - 1, target)
            else:
                self.searchHelp( integer_list, middle + 1, end, target)
        # right part sorted
        else: 
            if integer_list[middle] < target and target <= integer_list[end]:
                self.searchHelp( integer_list, middle + 1, end, target)
            else:
                self.searchHelp( integer_list, start, middle - 1, target)

             
if __name__ == "__main__":
    inst = Solution()
    test_list = [3,1]
    print inst.search(test_list, 1) 
