class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        "two dimensional matrix, largest sum of row"
        """
        largest = -1
        for i in range(len(accounts)):
            curr = sum(accounts[i])
            if curr > largest:
                largest = curr
            
        return largest

        """
        return max(sum(x) for x in accounts)