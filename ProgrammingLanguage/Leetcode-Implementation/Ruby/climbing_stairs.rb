# You are climbing a stair case. It takes n steps to reach to the top.
# Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

# @param {Integer} n
# # @return {Integer}
def climb_stairs(n)
  # For each step n, the number of ways is the sum of ways of (n - 1) and (n - 2)
  step_ways = [0, 1, 2]
  iter = 3
  while iter <= n
    step_ways[iter] = step_ways[iter - 1] + step_ways[iter - 2]
    iter += 1
  end
  return step_ways[n]
end
