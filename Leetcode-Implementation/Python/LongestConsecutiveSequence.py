#   Given [100, 4, 200, 1, 3, 2],
#   The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.
#   Your algorithm should run in O(n) complexity.

class Solution:
    # @param num, a list of integer
    # @return an integer
    def longestConsecutive(self, num):
        """ find the longest consecutive sequence count """
        
        sequence_count = dict() 
        
        for idx in range(len(num)):
            sequence_count[num[idx]] = 1    # each number has sequence count 1
        
        longest_count = 1
        
        for idx in range(len(num)):
            if num[idx] in sequence_count:
                curr_value = num[idx] + 1
                while  curr_value  in sequence_count:
                    sequence_count[ num[idx] ] += sequence_count[ curr_value ]
                    del sequence_count[curr_value]  # delete curr_value for dup count
                    curr_value = curr_value + 1     # seach for ajacent bigger number

                longest_count = max( longest_count, sequence_count[ num[idx] ] )

        return longest_count

if __name__ == "__main__":
    test_nums = [-1,1,0]
    inst = Solution()
    print inst.longestConsecutive(test_nums)
