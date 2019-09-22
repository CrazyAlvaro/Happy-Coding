#  Given a set of candidate numbers (C) and a target number (T),
#  find all unique combinations in C where the candidate numbers sums to T.
#
#  The same repeated number may be chosen from C unlimited number of times.
#
#  Note:
#  All numbers (including target) will be positive integers.
#  Elements in a combination (a1, a2, … , ak) must be in non-descending order. (ie, a1 ≤ a2 ≤ … ≤ ak).
#  The solution set must not contain duplicate combinations.
#  For example, given candidate set 2,3,6,7 and target 7,
#  A solution set is:
#  [7]
#  [2, 2, 3]

# Expect all positive numbers
class Combination_sum
  attr_accessor :combination_list

  def initialize(candidates, target)
    @candidates = candidates.sort!    # sort array first
    @combination_list = []
    try_combination(target, 0, [])
  end

  # recursive function to get all combinations and
  # see if target is 0, which means find a match
  def try_combination(target, index, current_list)
    if target == 0
      @combination_list.push(current_list)
      return
    end

    current_count = 0
    while index < @candidates.length and current_count * @candidates[index] <= target
      new_list = current_list.dup
      try_combination(target - current_count * @candidates[index], index + 1, new_list)

      current_count += 1
      current_list.push(@candidates[index])
    end
  end
end



# @param {Integer[]} candidates
# @param {Integer} target
# @return {Integer[][]}
def combination_sum(candidates, target)
  # basically we want to try out all possible combinations to see if it matches
  # sort the array and recursivly increment the index
  inst = Combination_sum.new(candidates, target)
  puts inst.combination_list.inspect
  return inst.combination_list
end

combination_sum([2,6,3,7], 7)
