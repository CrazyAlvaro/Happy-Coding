"""
 Follow up for "Remove Duplicates":
 What if duplicates are allowed at most twice?

 For example,
 Given sorted array A = [1,1,1,2,2,3],

 Your function should return length = 5, and A is now [1,1,2,2,3]. 
"""

        

class Solution:
    # @param A a list of integers
    # @return an integer
    def removeDuplicates(self, A):
        show_twice = False
        if len(A) < 3:
            return len(A)
        prev = A[0]
        remove_list = list() 
        for idx in range(1,len(A)):
            if A[idx] == prev:
                if show_twice:
                    remove_list.append(idx) 
                    #print "pop" + str(idx)
                else:
                    show_twice = True
                    #print "show"
            else:
                prev = A[idx]
                show_twice = False
                #print "move"
        remove_list.reverse()
        for idx in remove_list:
            A.pop(idx)
        return len(A)

if __name__ == "__main__":
    A=[1,1,1,1,1,1]
    inst = Solution()
    print inst.removeDuplicates(A)
    print A
