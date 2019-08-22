class Solution {
public:
    void merge(int A[], int m, int B[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        // solution: choose the bigger elemetn from the end of two sorted 
        // array store to the end of array A
        int itA=m-1, itB=n-1;
        int it=m+n-1;
        while( itA>=0 && itB>=0 ){
            if(A[itA]>=B[itB]){
                A[it]=A[itA];
                itA--;
                it--;
            }
            else{
                A[it]=B[itB];
                itB--;
                it--;
            }
        }
        
        if( itB<0)
            return ;
        // itA<0
        while( itB>=0){
            A[itB]=B[itB];
            itB--;
        }
        return ;
        
    }
};
