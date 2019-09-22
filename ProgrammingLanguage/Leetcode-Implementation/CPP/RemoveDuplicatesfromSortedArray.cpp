class Solution {
public:
    int removeDuplicates(int A[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(n<=1)
            return n;
            
        int prev=A[0];
        int count=1;

        for( int i=1, pos=1; i<n; i++){
            if( A[i]==prev )
                ;
            else if(pos!=i){
                A[pos]=A[i];
                prev=A[pos];
                pos++;
                count++;
            }
            else{
                prev=A[pos];
                pos++;
                count++;
            }
        }
        
        return count;
    }
};
