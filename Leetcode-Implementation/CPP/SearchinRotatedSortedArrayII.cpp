class Solution {
public:
    bool search(int A[], int n, int target) {
        // Apply binary search, half must be sorted
        
        int left = 0, right = n-1;
        int middle;
        while( left <= right ){
            middle = (left + right )/2;
            if( A[middle] == target )
                return true;
            
            if( A[left] < A[middle] ){ // left part is sorted
                if( A[left] <= target && target <= A[middle] )// within the range
                    right = middle -1;
                else
                    left = middle +1;
            }
            else if( A[left] > A[middle]) { // right part is sorted
                if( A[middle] <= target && target <= A[right] )// within the range
                    left = middle +1;
                else
                    right = middle -1;
            }
            else // A[left] == A[middle] while A[middle]!= target move left forward
            // greater or less number could be in this range, we don't know
                left++;
        }
        return false;    
    }
};
