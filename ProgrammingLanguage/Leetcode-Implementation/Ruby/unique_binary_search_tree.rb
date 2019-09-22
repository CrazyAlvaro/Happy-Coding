# @param {Integer} n
# @return {Integer}
def num_trees(n)
  # tree_num(n) = tree_num(0)*tree_num(n-1) + tree_num(1)*tree_num(n-2) + ...
  return 0 if n < 0
  return 1 if n == 0 or n == 1

  nums = [1,1]    # 0 -> 1, 1 -> 1
  (2..n).each { |iter|
    curr_num = 0

    # 1 need to be the root
    (0..(iter - 1)).each { |left_num|
      curr_num += nums[left_num]*nums[iter - left_num - 1]
    }

    nums[iter] = curr_num
  }
  return nums[n]
end

puts num_trees(3)
