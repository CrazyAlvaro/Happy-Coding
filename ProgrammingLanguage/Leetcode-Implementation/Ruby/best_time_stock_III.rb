# Say you have an array for which the ith element is the price of a given stock on day i.
# Design an algorithm to find the maximum profit. You may complete at most two transactions.

def max_profit(prices)
  # divide and conquer
  return 0 if prices.length < 2
  before_day_profit, after_day_profit = [], []

  # Get array of profit could get before today's transaction
  lowest_price, before_day_profit[0]  = prices[0], 0
  most_profit = 0
  iter = 1
  while iter < prices.length
    today_price = prices[iter]
    lowest_price = [today_price, lowest_price].min
    most_profit = [today_price - lowest_price, most_profit].max
    before_day_profit[iter] = most_profit
    iter += 1
  end

  # Get array of profit after today's transaction
  highest_price, after_day_profit[prices.length - 1] = prices[prices.length - 1], 0
  most_profit = 0
  iter = prices.length - 2
  while iter >= 0
    today_price = prices[iter]
    highest_price = [today_price, highest_price].max
    most_profit = [highest_price - today_price, most_profit].max
    after_day_profit[iter] = most_profit
    iter -= 1
  end

  most_profit = 0
  #puts "price  #{prices.inspect}"
  #puts "before #{before_day_profit.inspect}"
  #puts "after  #{after_day_profit.inspect}"
  if before_day_profit.length != after_day_profit.length
    raise "Internal error, array length not match"
  else
    for i in 0..prices.length - 1
      today_profit = before_day_profit[i] + after_day_profit[i]
      most_profit = most_profit < today_profit ? today_profit : most_profit
    end
  end
  most_profit
end

#puts "Most profit #{max_profit([1,2,3,3,2,1,0,3,5,4,2,5])}"
puts "Most profit #{max_profit([2,1,2,0,1])}"

