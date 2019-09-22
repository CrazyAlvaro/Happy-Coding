# Given an array with n objects colored red, white or blue,
# sort them so that objects of the same color are adjacent, with the colors in the order red, white and blue.
# Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

# @param {Integer[]} nums
# @return {Void} Do not return anything, modify nums in-place instead.
def sort_colors(nums)
  # two phrases, one move all reds forward, then all blues backward

  # move reds to the front
  front, back = 0, nums.size - 1
  while front < back
    while nums[front] == 0 and front < back
      front += 1
    end

    while nums[back]  != 0 and front < back
      back -= 1
    end

    break if front >= back

    nums[front], nums[back] = nums[back], nums[front]
    front, back = front + 1, back - 1
  end

  # move blues to the back
  front += 1 if nums[front] == 0
  back = nums.size - 1
  while front < back
    while nums[front] == 1 and front < back
      front += 1
    end

    while nums[back]  != 1 and front < back
      back -= 1
    end

    break if front >= back

    nums[front], nums[back] = nums[back], nums[front]
    front, back = front + 1, back - 1
  end
end

nums = [0, 1, 2, 0, 2, 1, 2]
sort_colors(nums)
p nums
