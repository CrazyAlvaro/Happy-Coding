# Follow up for "Remove Duplicates":
#   What if duplicates are allowed at most twice?
#
# For example,
#   Given sorted array nums = [1,1,1,2,2,3],
#
#   Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3. It doesn't matter what you leave beyond the new length.

# @param {Integer[]} nums
# @return {Integer}
def remove_duplicates(nums)
  if nums.length < 3
    return nums.length
  end

  prev = nums[0]
  twiced = false
  it = 1

  while it < nums.length
    if twiced && nums[it] == prev
      nums.delete_at(it)
    elsif nums[it] == prev
      twiced = true
      it = it + 1
    else
      prev = nums[it]
      twiced = false
      it = it + 1
    end
  end

  return nums.length
end

nums = [1,1,1,2,2,3,3,3,3,3,4,5,5,5,5]
puts nums
remove_duplicates(nums)
puts "==="
puts nums
