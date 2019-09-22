# @param {Integer[]} nums
# @return {Integer[][]}
def permute(nums)
  permutations = []
  permute_help(nums, 0, permutations)
  permutations
end

def permute_help(nums, index, permutations)
  if index == nums.size - 1
    permutations.push(nums.clone)
    return
  end

  (index..(nums.size - 1)).each do |position|
    nums[index], nums[position] = nums[position], nums[index]
    permute_help(nums, index + 1, permutations)
    nums[index], nums[position] = nums[position], nums[index]
  end
end

# Test
puts permute([1,2,3]).inspect
