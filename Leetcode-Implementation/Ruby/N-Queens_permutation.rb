#  Given an integer n, return all distinct solutions to the n-queens puzzle.
#
#  Each solution contains a distinct board configuration of the n-queens' placement,
#  where 'Q' and '.' both indicate a queen and an empty space respectively.
#
#  For example,
#  There exist two distinct solutions to the 4-queens puzzle:
#
# [
#   [".Q..",  // Solution 1
#    "...Q",
#    "Q...",
#    "..Q."],
#
#   ["..Q.",  // Solution 2
#    "Q...",
#    "...Q",
#    ".Q.."]
# ]

# Convert array of positions to ".Q.." strings
#def convert_chess(size, solutions = [])
#  # construct string with size of '.'
#  pattern = "." * size
#
#  results = []
#  for solution in solutions
#    str_solution = []
#
#    for num in solution
#      str_result = pattern.clone
#      str_result[num] = "Q"
#      #puts "#{str} then #{str_result}"
#      str_solution.push(str_result)
#    end
#
#    results.push(str_solution)
#  end
#  results
#end

def convert_chess(size, solutions = [])
  # construct string with size of '.'
  pattern = Array.new(size) { String.new("." * size) }

  results = []
  for solution in solutions
    str_result = pattern.map { |element| element.dup }
    solution.each_with_index do |num, index|
      raise "current solution is #{solution} index #{index} num #{num}" if index == nil or num == nil
      str_result[index][num] = "Q"
    end

    results.push(str_result)
  end
  results
end

# Check see if each permutations position meets NQueen problem's requirements
def check_NQueen(candidate)
  size = candidate.length
  for i in 0..(size - 1)
    for j in (i + 1)..(size - 1)
      #puts "current: #{i} #{j} and #{candidate[i]} #{candidate[j]}"
      if (candidate[i] - candidate[j]).abs == (i - j).abs
        return false
      end
    end
  end
  return true
end

# generate all permutations of a array
def generate_permutations(nums, pos, permutations)
  if pos == nums.length
    #puts "A new permutations get #{nums}"
    permutations.push(nums.clone)
    return
  end

  pos.upto(nums.length - 1) do |change_pos|
    nums[pos], nums[change_pos] = nums[change_pos], nums[pos]
    #puts "current change_pos: #{change_pos} and current nums changed is: #{nums}"
    generate_permutations(nums, pos + 1, permutations)
    nums[pos], nums[change_pos] = nums[change_pos], nums[pos]
  end
end

# @param {Integer} n
# @return {String[][]}
def solve_n_queens(n)
  # Array [0, 1, 2 ... N-1 ] stands for the position of Q, no Q in same position
  nums = []
  for i in 1..n do
    nums.push(i - 1)
  end

  # generate all permutations of [0..(n-1)] stands for position of Q in string
  permutations = []
  generate_permutations(nums, 0, permutations)
  #puts "Permutations are : #{permutations}"

  # check if this Array of number contradict to Queen's solution pos_diff = array_pos_diff, diagnonal
  results = []
  for candidate in permutations
    if check_NQueen(candidate)
      results.push(candidate)
    end
  end

  # convert each array to string
  results = convert_chess(n, results)
  results
end

arr = solve_n_queens(9)
#for item in arr
#  puts "result of NQueen is: #{item.inspect}"
#end
