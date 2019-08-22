#  Rotate an array of n elements to the right by k steps.
#
#  For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].
#
#  Note:
#  Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.
#
#  Related problem: Reverse Words in a String II

# @param {Integer[]} nums
# @param {Integer} k
# @return {Void} Do not return anything, modify nums in-place instead.
def rotate(nums, k)
  size = nums.length
  k = k % size

  # each number's new postion
  # (curr + k) % n

  # using a hash to store postitions has been visitied
  unvisited = {}
  (0..(size-1)).each { |num|
    unvisited[num] = num
  }

  pos = 0
  prev_number = nums[pos]
  while 1
    break if unvisited.size == 0  # all visited

    if unvisited[pos] == nil
      pos = pos + 1
      prev_number = nums[pos]
    else
      unvisited.delete(pos) #delete it

      new_pos = (pos + k) % size
      temp_number = nums[new_pos]
      nums[new_pos] = prev_number

      prev_number = temp_number # update prev_number to current pos
      pos = new_pos # update position
      #puts nums.inspect
    end
  end
end

nums = [1,2,3,4,5,6,7]
rotate(nums, 3)
puts nums.inspect
puts "Expect: [5,6,7,1,2,3,4]"

nums = [1,2,3,4,5,6]
rotate(nums, 2)
puts nums.inspect
puts "Expect: [5,6,1,2,3,4]"
