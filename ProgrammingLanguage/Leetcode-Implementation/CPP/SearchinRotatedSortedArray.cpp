class Solution {
public:
    int search(int A[], int n, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        // #1 hashtable
        // treat it as two sorted array if we know the pivot
        int l=0;
        int r=n-1;
        
        while( l<=r){
            int m= l+ (r-l)/2;
            if(A[m]==target)
                return m;
            
            // bottom is sorted
            if(A[l]<=A[m]){
                if(A[l]<=target && target<=A[m])
                    r=m-1;
                else
                    l=m+1;
            }
            else{ // upper is sorted
                if(A[m]<=target && target<=A[r])
                    l=m+1;
                else
                    r=m-1;
            }
        }
        
        return -1;
        
    }
};


//  This is O(n) time performance
class Solution {
public:
    int search(int A[], int n, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        // #1 hashtable
        // treat it as two sorted array if we know the pivot
        for( int i=0; i<n; i++){
            if(A[i]==target)
                return i;
        }
        return -1;
        
    }
};
