#   Given an array of non-negative integers, you are initially positioned at the first index of the array.
#
#   Each element in the array represents your maximum jump length at that position.
#
#   Determine if you are able to reach the last index.
#
#   For example:
#   A = [2,3,1,1,4], return true.
#
#   A = [3,2,1,0,4], return false.

# @param {Integer[]} nums
# @return {Boolean}
def can_jump(nums)

  # from first traverse to end, keep track of the furthest can jump

  furthest, curr = 0, 0
  while curr <= furthest and curr < nums.size
    furthest = [furthest, curr + nums[curr]].max
    curr += 1
    return true if furthest >= nums.size - 1
  end

  return false
end


puts can_jump([2,3,1,1,4]).inspect
puts can_jump([3,2,1,0,4]).inspect
