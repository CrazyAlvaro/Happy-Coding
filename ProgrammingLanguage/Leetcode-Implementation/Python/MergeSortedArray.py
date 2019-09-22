class Solution:
    # @param A  a list of integers
    # @param m  an integer, length of A
    # @param B  a list of integers
    # @param n  an integer, length of B
    # @return nothing
    def merge(self, A, m, B, n):
        a, b = 0, 0
        while a < m and b < n:
            if A[a] < B[b]:
                a += 1
            else:
                A.insert(a, B[b] )
                a, b = a + 1, b + 1
                m += 1
        while b != len(B):
            A[a] = B[b]
            a, b = a +1, b +1

if __name__ == "__main__":
    inst = Solution()
    A = [0]
    B = [1]
    inst.merge(A, 0, B, 1)
    print A
