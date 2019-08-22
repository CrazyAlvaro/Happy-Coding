# Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.
#
# Do not allocate extra space for another array, you must do this in place with constant memory.
#
# For example,
# Given input array nums = [1,1,2],
#
# Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.

# @param {Integer[]} nums
# @return {Integer}
def remove_duplicates(nums)
  if nums.length < 2
    return nums.length
  end

  prev = nums[0]

  it = 1
  while it < nums.length
    if prev == nums[it]
      nums.delete_at(it)
    else
      prev = nums[it]
      it = it + 1
    end
  end

  return nums.length
end

nums = [0,0,0,0,0]

remove_duplicates(nums)
