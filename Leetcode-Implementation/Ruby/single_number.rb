#  Given an array of integers, every element appears twice except for one. Find that single one.
#
#  Note:
#  Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

# @param {Integer[]} nums
# @return {Integer}
def single_number(nums)
  # bit maniipulation XOR
  single = 0
  for num in nums
    single = single ^ num
  end
  return single
end

# Hash table
def single_number_1(nums)
  hash = Hash.new
  for num in nums
    if !hash[num]
      hash[num] = true
    else
      hash.delete(num)
    end
  end
  puts hash.keys[0]
end

single_number_1([1,2,2,1,44,4,4,55,55,44,9])
