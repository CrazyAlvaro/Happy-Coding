class Solution:
    # @param s, a string
    # @return a list of lists of string
    def partition(self, s):
        """ 
        partition s such that every substr is a palindomr 
        return all possible partitions 
        """
        # first construct a two-d matrix represent valid substr palindrome
        # then search for all possible partitions
        self._palin_matrix_ = self.constructPalindromeMatrix(s)
        self._valid_partition_ = [] 
        self.partitionString(s, [], 0)     # get partition list
        return self._valid_partition_

    def partitionString(self, string, temp_list, curr_pos):
        """
        recursive function to generate partition list
        """
        if curr_pos == len(string):
            new_list = temp_list[:] # create a new object
            self._valid_partition_.append( new_list)
            return
        
        for idx in range( curr_pos, len(string) ):
            if self._palin_matrix_[curr_pos][idx]:
                temp_list.append( string[curr_pos:idx + 1] )
                self.partitionString( string, temp_list, idx+1)
                temp_list.pop()     # pop last insert substring

    def constructPalindromeMatrix(self, s):
        """
        construct a two dimensional list to represent 
        valid palindrome substr of string s
        return a list of list
        """
        # initialize to all false
        valid_palin =[ [False for _ in range(len(s))] for _ in range(len(s))] 
        for start in range(len(s)):
            for end in range(start, len(s)):
                substr = s[start:end + 1] 
                if self.isPalindrome( substr ):
                    valid_palin[start][end] = True
        return valid_palin


    def isPalindrome(self, test_str ):
        """
        determine if a string is a palindarome
        assume only alphnumeric character
        """

        left, end = 0, len(test_str) - 1
        while left < end:
            if test_str[left] != test_str[end]:
                return False
            left, end = left + 1, end - 1 

        return True

if __name__ == "__main__":
    test_string = "aab"
    inst = Solution()
    result = inst.partition(test_string)
    print result
