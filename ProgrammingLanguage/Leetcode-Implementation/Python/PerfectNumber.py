class Solution(object):
    def checkPerfectNumber(self, num):
        """
        :type num: int
        :rtype: bool
        """
        if num <= 0: return False

        res, SQRT = 0, int(num ** 0.5)
        res = sum(i + num/i for i in range(1, SQRT + 1) if not num % i)
        res -= num
        if num == SQRT ** 2: res -= SQRT

        return res == num
