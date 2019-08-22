//Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

//For example, given the array [−2,1,−3,4,−1,2,1,−5,4],
//the contiguous subarray [4,−1,2,1] has the largest sum = 6.


class Solution {
public:
    int maxSubArray(int A[], int n) {
        // for each position, A[i] store the max subarray containing A[i]
        if( n < 1 )
            return 0;
        int max = INT_MIN;
        max = A[0];
        for( int i = 1; i < n; i++){
            A[i] = A[i] + A[i-1] > A[i] ? ( A[i] + A[i-1] ) : A[i];
            max = max >= A[i] ?  max : A[i];
        }
        
        return max;
    }
};
