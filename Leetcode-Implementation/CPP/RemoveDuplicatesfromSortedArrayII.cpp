#include<vector>

using namespace std;

class Solution {
public:
    int removeDuplicates(int A[], int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( n < 2 )
            return n;
            
        int count=1;
        int prev = A[0];
        int pos =1;
        for( int i =1; i< n; i++){
            if( prev == A[i] ){
                if( (++count) > 2 )
                    continue;
                else{ // count == 2
                    A[pos] = A[i];
                    pos++;
                }
            }
            else{
                A[pos] = A[i];
  			prev = A[pos];
                pos++;
                count = 1;
            }
        }
        return pos;
    }
};

void main(){
	Solution test;
	int A[]={1,2,3,3};
	test.removeDuplicates(A,4);
}
