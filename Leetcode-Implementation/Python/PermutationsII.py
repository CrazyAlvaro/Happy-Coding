# Given a collection of numbers that might contain duplicates, return all possible unique permutations.
# 
# For example,
# [1,1,2] have the following unique permutations:
# [1,1,2], [1,2,1], and [2,1,1].


class Solution:
    # @param num, a list of integer
    # @return a list of lists of integers
    def permuteUnique(self, num):
        """
        Get all unique permutations from a list with duplicates
        """
   
    def genPermutation(self, num, prePermutions)

## have duplicates
##
# class Solution:
#     # @param num, a list of integer
#     # @return a list of lists of integers
#     def permuteUnique(self, num):
#         """
#         Get all unique permutations from a list with duplicates
#         """
# 
#         # idea:
#         # First: Get all permutaions to set
#         # Second: Get unique permutaions, sort list, each time check prev choosed number
#         self._ret_list = []
#         num.sort()                                      # sort list
#         self.genPermutaion(num, 0) 
#         return self._ret_list
# 
#     def genPermutation(self, num, pos):     
#         """
#         Recursive function to swap pos with unique digit
#         """
#         if pos == len(num):
#             self._ret_list.append( num[:] )
#             return 
# 
#         self.genPermutation(num, pos + 1) #without change
#         for swap_pos in range(pos + 1, len(num) ):
#                 if num[swap_pos] == num[swap_pos-1]:
#                     continue
#                 else:
#                     self.swap(num, pos, swap_pos)
#                     self.genPermutaion(num, pos + 1)
#                     self.swap(num, pos, swap_pos)       # have to swap back
# 
#     def swap(self, num, fir, sec):
#         temp_num = num[fir]
#         num[fir] = num[sec]
#         num[sec] = temp_num


if __name__ =="__main__":
    inst = Solution()
    num = [1,1,2,3]
    print inst.permuteUnique(num)
                    
