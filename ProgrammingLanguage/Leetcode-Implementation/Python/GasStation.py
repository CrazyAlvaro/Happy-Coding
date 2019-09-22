class Solution:
    # @param gas, a list of integers
    # @param cost, a list of integers
    # @return an integer
    def canCompleteCircuit(self, gas, cost):
        remains = []
        if len(gas) != len(cost):
            return -1
        length = len(gas)
       
        idx = 0
        while True:
            if idx == length:
                return -1

            remain_gas = 0
            finish = True
            for pos in range(length):
                curr = (idx + pos)%length
                remain_gas = remain_gas + gas[curr] - cost[curr]
                if remain_gas < 0:
                    if curr < idx:
                        return -1
                    else:
                        finish = False
                        idx = curr + 1      # if the position not has enough gas, the stations before won't succeed
                        break

            if finish:
                return idx
            
