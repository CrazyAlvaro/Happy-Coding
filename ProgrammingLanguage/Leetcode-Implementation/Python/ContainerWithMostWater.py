class Solution:
    """ @return an integer
        just use the two lines, and there's nothing between them
    """

    def maxArea(self, height):
        """ function compute the most contain water """
        left, right = 0, len(height) - 1
        most_water = 0
        while left < right:
            most_water = max( most_water, (right - left)*min( height[left], height[right]) )
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return most_water
                
