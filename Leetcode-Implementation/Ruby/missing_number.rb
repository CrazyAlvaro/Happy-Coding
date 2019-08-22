#  Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.
#
#  For example,
#  Given nums = [0, 1, 3] return 2.
#
#  Note:
#  Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

# @param {Integer[]} nums
# @return {Integer}
def missing_number(nums)
  # sum from 0 ~ n would be n(n+1)/2
  # record the largest one and the sum

  sum = 0
  contains_zero = false
  largest = 0
  for number in nums
    contains_zero = true if number == 0
    largest = number if number > largest
    sum += number
  end

  if (largest * (largest + 1))/2 == sum
    # can be either 0 or largest + 1
    missing_number = contains_zero ? largest + 1 : 0
  else
    missing_number = (largest * (largest + 1))/2 - sum
  end
  missing_number
end

puts missing_number([0])
puts missing_number([1, 0])
puts missing_number([0, 1, 3])
puts missing_number([0, 1, 2, 3, 5, 6, 7])
