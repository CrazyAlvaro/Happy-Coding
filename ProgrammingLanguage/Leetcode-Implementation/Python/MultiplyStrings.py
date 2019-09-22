class Solution(object):
    def multiply(self, num1, num2):
        """
        :type num1: str
        :type num2: str
        :rtype: str

        assume no leading 0s
        """
        result = [0] * (len(num1) + len(num2))

        for first, n1 in enumerate(reversed(num1)):
            for second, n2 in enumerate(reversed(num2)):
                result[first+second] += int(n1) * int(n2)
                result[first+second+1] += result[first+second] / 10
                result[first+second] %= 10

        while len(result) > 1 and result[-1] == 0:
            result.pop()

        return ''.join(map(str, result[::-1]))
