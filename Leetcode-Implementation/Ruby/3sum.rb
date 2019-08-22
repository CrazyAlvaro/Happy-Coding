#   Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
#
#   Note:
#
#   Elements in a triplet (a,b,c) must be in non-descending order. (ie, a ≤ b ≤ c)
#   The solution set must not contain duplicate triplets.
#    For example, given array S = {-1 0 1 2 -1 -4},
#
#    A solution set is:
#    (-1, 0, 1)
#    (-1, -1, 2)

def increase_iter(nums, iter)
  while iter + 1 < nums.size and nums[iter] == nums[iter + 1]
    iter += 1
  end

  return iter + 1 >= nums.size ? nums.size : iter + 1
end

def decrease_iter(nums, iter)
  while iter - 1 >= 0 and nums[iter] == nums[iter - 1]
    iter -= 1
  end

  return iter - 1 < 0 ? 0 : iter - 1
end

# @param {Integer[]} nums
# @return {Integer[][]}
def three_sum(nums)
  # sort nums first
  nums.sort!
  solution_set = []


  # use two pointer merge to the center
  iter = 0
  while iter < nums.size
    first, second = iter + 1, nums.size - 1

    while first < second
      if nums[iter] + nums[first] + nums[second] == 0
        solution_set.push([nums[iter], nums[first], nums[second]])
        first = increase_iter(nums, first)
        second = decrease_iter(nums, second)
      elsif nums[iter] + nums[first] + nums[second] < 0
        first = increase_iter(nums, first)
      else
        second = decrease_iter(nums, second)
      end
    end
    iter = increase_iter(nums, iter)
  end
  solution_set
end

puts three_sum([-1, 0, 1, 2, -1, -4]).inspect
