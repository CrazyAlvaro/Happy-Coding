class Solution:
    """
    # @param ratings, a list of integer
    # @return an integer
    """
    def candy(self, ratings):
        """
        Each child must has at least one candy
        Children with a higher rating get more candies than their neighbors
        """
        
        # from both side check candies meet the requirements
        candy_list = [ 1 for _ in range( len(ratings) ) ]
        
        for idx in range( 1, len(ratings) ):
            if ratings[idx] > ratings[idx - 1]:
                candy_list[idx] = candy_list[idx-1] + 1
        
        for idx in range( -2, -(len(ratings) + 1), -1 ):
            if ratings[idx] > ratings[idx + 1]:
                candy_list[idx] = max( candy_list[idx], candy_list[idx + 1] + 1)

        print candy_list
        return sum( candy_list )
        
if __name__ == "__main__":
    ratings = [2,1]
    inst = Solution()
    print inst.candy( ratings), "expect 3"
