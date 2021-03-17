class Solution:
    def sortArrayByParity(self, A: List[int]) -> List[int]:
        front, end = 0, len(A) - 1
        while front < end:
            while A[front] % 2 == 0 and front < end:
                front += 1
            
            while A[end] %2 == 1 and front < end:
                end -= 1
            
            if front > end:
                break
                
            A[front], A[end]= A[end], A[front]
        
        return A