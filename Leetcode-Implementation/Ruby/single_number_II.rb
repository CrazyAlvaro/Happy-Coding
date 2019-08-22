# Given an array of integers, every element appears three times except for one. Find that single one.

# @param {Integer[]} nums
# @return {Integer}
def single_number(nums)
  # another way is to maintain each bit occurs once, twice, three times, 0, 0, ~0
  hash = Hash.new

  for num in nums
    if !hash[num]
      hash[num] = 1
    elsif hash[num] == 1
      hash[num] = 2
    else
      hash.delete(num)
    end
  end
  return hash.keys[0]
end

puts single_number([1,2,2,1,44,4,4,55,55,44,1,2,4,44,55,9])
