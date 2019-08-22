# Input: numbers={2, 7, 11, 15}, target=9
# Output: index1=1, index2=2

# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer[]}
def two_sum(nums, target)

  number_position = {}
  nums.each_with_index do |number, index|
    if number_position[target - number] != nil
      return [number_position[target - number] + 1, index + 1]
    else
      number_position[number] = index
    end
  end

  return [0, 0] # indicate failure
end

puts two_sum([2, 7, 11, 15], 9).inspect
