class Solution {
public:
    int searchInsert(int A[], int n, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        int low=0;
        int high=n;
        int middle;
        
        while( low <= high ){
            middle = ( low + high) /2;
            
            if( A[middle] > target )
                high=middle-1;
            else if( A[middle] < target )
                low = middle+1;
            else 
                return middle;
        }
        if( low > n)
            low--;
        return low;    
    }
};
