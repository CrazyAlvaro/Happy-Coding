# Say you have an array for which the ith element is the price of a given stock on day i.
#
# Design an algorithm to find the maximum profit. You may complete as many transactions as you like
# (ie, buy one and sell one share of the stock multiple times).
# However, you may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

# @param {Integer[]} prices
# @return {Integer}
def max_profit(prices)
  # Buy a stock when the price begin to increase, sell it when the price begin to decrease.
  return 0 if prices.length < 2

  on_hold = false
  buy_price, yesterday_price, total_profit = nil, prices[0], 0

  iter = 1
  while iter < prices.length
    today_price = prices[iter]
    case on_hold
    when true
      # currently hold a stock
      # sell the stock if price begin to decrease, no action needed otherwise
      if today_price < yesterday_price
        total_profit += yesterday_price - buy_price
        on_hold = false
      end
    when false
      # current not hold a stock
      # buy if stock begin to increase
      if today_price > yesterday_price
        buy_price = yesterday_price
        on_hold = true
      end
    end
    yesterday_price = prices[iter]  # update yesterday_price
    iter += 1
  end
  total_profit += yesterday_price - buy_price if on_hold # sell it after the end
  total_profit
end

puts "Max profit is #{max_profit([0,1,5,3,4,3,3,2,1,5])}"
puts "Max profit is #{max_profit([1,2])}"
