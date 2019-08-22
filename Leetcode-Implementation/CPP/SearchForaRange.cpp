class Solution {
public:
    vector<int> searchRange(int A[], int n, int target) {
        // divide this question to search for lower bound and upper bound
        vector<int> ret(2,-1);
        
        int low=0;
        int high=n-1;
        int middle;
        
        // Search for lower bound
        while( low < high ){
            middle= ( low + high ) / 2;
            if ( A[middle] < target )
                low=middle + 1;
            else
                high=middle;
        }
        
        if( A[low] != target ) // not found
            return ret;
        ret[0]=low;
            
        // Search for upper bound by searching the next value bigger thann target
        high=n;
        while( low < high ){
            middle= ( low + high )/2;
            if ( A[middle] > target )
                high = middle;
            else
                low= middle+1;
        }
        ret[1]=high-1;
        return ret;
    }
};
