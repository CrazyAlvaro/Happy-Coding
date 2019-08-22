class Solution:
    # @param prices, a list of integer
    # @return an integer
    def maxProfit(self, prices):
        if len(prices) < 2: return 0
        lowest = prices[0]
        profit = 0
        for i in range(1, len(prices)):
            if prices[i] < lowest:
                lowest = prices[i]
            if prices[i] - lowest > profit:
                profit = prices[i] - lowest
                
        return profit 
