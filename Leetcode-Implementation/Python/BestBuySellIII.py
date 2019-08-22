class Solution:
    # @param prices, a list of integer
    # @return an integer
    def maxProfit(self, prices):
        """
        make at most two trasactions, only one at a time
        """
        if len(prices) == 0:
            return 0
        final_profit = 0
        up_now_profit = []
        #from_then_profit = up_now_profit[:] 
       
        lowerest = prices[0]
        max_profit = 0
        for idx in range( len(prices) ):
            lowerest = prices[idx] if lowerest > prices[idx] else lowerest
            profit = prices[idx] - lowerest
            max_profit = profit if profit > max_profit else max_profit 
            up_now_profit.append( max_profit )

        highest = prices[-1]
        max_profit = 0
        for idx in range(-1, -len(prices)-1, -1 ):
            highest = prices[idx] if highest < prices[idx] else highest
            profit = highest - prices[idx]
            max_profit = profit if profit > max_profit else max_profit 
            #from_then_profit.insert(0, max_profit )
            
            final_profit = max(final_profit,  max_profit + up_now_profit[idx] )

        #max_profit = 0
        #for idx in range( len(prices) ):
        #    max_profit = max( max_profit, ( up_now_profit[idx] + from_then_profit[idx] ) )
             
        return final_profit 

