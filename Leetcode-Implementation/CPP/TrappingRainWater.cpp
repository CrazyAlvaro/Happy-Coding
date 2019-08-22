//Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

//For example,
//Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.



class Solution {
public:
    int trap(int A[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<int> maxLeft;
        vector<int> maxRight;
        int max = 0;
        
        for( int i = 0; i < n; i++){
            maxLeft.push_back( max );
            max = A[i] > max ? A[i] : max;
        }
        
        max = 0;
        for( int i = n-1; i>= 0; i--){
            maxRight.push_back( max );
            max = A[i] > max ? A[i] : max;
        }
        
        int sum = 0;
        int temp;
        for( int i = 0; i < n; i++){
            temp = min( maxLeft[i], maxRight[ n - i -1 ] ) - A[i];
            sum += ( temp > 0 ? temp : 0 );
        }
        return sum;
    }
};
