# a + b + c = 0, no duplicates

class Solution:
    # @return a list of lists of length 3, [[val1,val2,val3]]
    def threeSum(self, num):
        """
            two ways: 1 use a hash to store each element,
                   and i, j check if (-num[i]-num[j]) exist
                  2 for each num[i] get two iterator from both
                   side, easy to handle duplicate
        """
        ret = []
        num.sort() 
        for i in range(len(num) - 2):
            if i > 0 and num[i] == num[i-1]:    # pass duplicate
                continue 
            m, n = i + 1, len(num) - 1
            while m < n: 
                if num[i] + num[m] + num[n] == 0:
                    ret.append( [ num[i], num[m], num[n] ] )
                    m = self.increm_iterator(num, m)
                    n = self.decrem_iterator(num, n)
                elif num[i] + num[m] + num[n] > 0:
                    n = self.decrem_iterator(num, n)
                else:
                    m = self.increm_iterator(num, m)
        return ret

    """ Following two functions to avoid duplicates"""
    def increm_iterator(self, num, it ):
        while it + 1 < len(num) and num[it] == num[it + 1]:
            it += 1
        return it + 1
    def decrem_iterator(self, num, it ):
        while it > 0 and num[it] == num[it - 1]:
            it -= 1
        return it - 1

if __name__ == "__main__":
    num = [ -25, -10, -7, -3, 2, 4, 8, 10]
    inst = Solution()
    ret = inst.threeSum(num)
    print ret
