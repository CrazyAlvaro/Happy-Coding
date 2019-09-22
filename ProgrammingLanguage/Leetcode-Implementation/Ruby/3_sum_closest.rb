# @param {Integer[]} nums
# @param {Integer} target
# @return {Integer}
def three_sum_closest(nums, target)
  return nil if nums.size < 3

  nums.sort!

  curr_closest = nums[0] + nums[1] + nums[2]

  # a, b, c are three index
  (0..(nums.size-3)).each do |a|
    b, c = a + 1, nums.size - 1

    while b < c
      #puts "#{a} #{b} #{c}"
      curr = nums[a] + nums[b] + nums[c]

      return curr if curr == target
      curr_closest = curr if (curr - target).abs < (curr_closest - target).abs

      if curr - target > 0
        c -= 1
      else
        b += 1
      end
    end
  end

  return curr_closest
end

# Test
puts "[-1, 2, 1, -4] target is 1, closest is #{three_sum_closest([-1, 2, 1, -4], 1)}"
