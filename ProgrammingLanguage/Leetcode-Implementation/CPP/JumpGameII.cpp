class Solution {
public:
    int jump(int A[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int max_dist;
        int curr_dist = 0;
        int step = 1;
        if( n <= 1 )
            return 0;
            
        max_dist = A[0];
        curr_dist = max_dist;
        if( max_dist >= n-1 )
            return step;
            
        step++;
        
        for( int i = 1; i < n-1; i++){  
            if( max_dist >= n-1 )
                return step;
                
            if( i > curr_dist ){
                curr_dist= max_dist;
                step++;
            }
            
            if( A[i] + i > max_dist )
                max_dist = A[i] + i;     
        }
        return step;
    }
};
