# Write an efficient algorithm that searches for a value in an m x n matrix.
# This matrix has the following properties:
#
# Integers in each row are sorted from left to right.
# The first integer of each row is greater than the last integer of the previous row.
# For example,
#
# Consider the following matrix:
#
# [
#     [1,   3,  5,  7],
#     [10, 11, 16, 20],
#     [23, 30, 34, 50]
# ]


# return the row number might contain the target
# @return number
def search_row(matrix, target)
  small, large = 0, matrix.length - 1
  row = ((small + large)/2).to_i

  while (large - small) > 1
    if target < matrix[row][0]
      large = row
    else
      small = row
    end
    row = ((small + large)/2).to_i
  end

  target_row = target < matrix[large][0] ? small : large
  target_row
end

# return whether contains target or not
# @return {boolean}
def binary_search(nums, target)
  left, right = 0, nums.length - 1
  middle = ((left + right)/2).to_i

  while (right - left) > 1
    if target < nums[middle]
      right = middle
    else
      left = middle
    end
    middle = ((left + right)/2).to_i
  end

  is_target = nums[left] == target || nums[right] == target ? true : false
  is_target
end

# @param {Integer[][]} matrix
# @param {Integer} target
# @return {Boolean}
def search_matrix(matrix, target)
  # Two step binary search
  return false if matrix.length == 0

  row_num = search_row(matrix, target)
  return binary_search(matrix[row_num], target)
end


test_matrix = [[1,   3,  5,  7],
               [10, 11, 16, 20],
               [23, 30, 34, 50]]

puts search_matrix(test_matrix, 11)
puts search_matrix(test_matrix, 10)
puts search_matrix(test_matrix, 1)
puts search_matrix(test_matrix, 23)
puts search_matrix(test_matrix, 50)
puts search_matrix(test_matrix, 49)
