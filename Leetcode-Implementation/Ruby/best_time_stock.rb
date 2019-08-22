# Say you have an array for which the ith element is the price of a given stock on day i.
# If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.

# @param {Integer[]} prices
# @return {Integer}
def max_profit(prices)
  # Traverse the current day, assume it's the sell day, what the best profit could get.
  # so we just need to keep track of the lowest price before today, and current max_profit
  return 0 if prices.length < 2

  max_profit, lowest_price = 0, prices[0]

  for today_price in prices
    today_profit = today_price - lowest_price
    max_profit = today_profit > max_profit ? today_profit : max_profit
    lowest_price = lowest_price > today_price ? today_price : lowest_price
  end

  max_profit
end
