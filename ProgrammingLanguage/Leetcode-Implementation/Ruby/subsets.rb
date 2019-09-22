# Given a set of distinct integers, nums, return all possible subsets.
#
#   Note:
#   Elements in a subset must be in non-descending order.
#   The solution set must not contain duplicate subsets.
#   For example,
#   If nums = [1,2,3], a solution is:
#
#   [
#     [3],
#     [1],
#     [2],
#     [1,2,3],
#     [1,3],
#     [2,3],
#     [1,2],
#     []
#   ]

def generate_subset(nums, pos, curr_items, results)
  if pos == nums.length
    results.push(curr_items)
    return
  end

  with_curr = curr_items.clone
  with_curr.push(nums[pos])
  generate_subset(nums, pos + 1, with_curr, results)

  generate_subset(nums, pos + 1, curr_items, results)
end

def print_array(arr)
  puts "size #{arr.length}"
  for item in arr
    puts "Item: #{item}"
  end
end

# @param {Integer[]} nums
# @return {Integer[][]}
def subsets(nums)
  # non-descending order, sort
  nums.sort!
  # Recursive way, distinct integers
  results, curr = [], []
  generate_subset(nums, 0, curr, results)
  print_array(results)
end

subsets([4,1,0])
