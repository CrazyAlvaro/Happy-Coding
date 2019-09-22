// My implementation O(N) O(N) space
// Fix Bug NULL == 0

int firstMissingPositive(int A[], int n) {
    // Start typing your C/C++ solution below
    // DO NOT write int main() function
    bool exist[1000]={false};
    size_t i=0;
    //while( A[i] != NULL ){ /////////////////////////////// this is not right 0
	for( ; i<n; i++){
        if( A[i] >0 ){
            exist[A[i]]=true;
            //counter++;
        }
	}
  
    i=1;
    for( ; exist[i]!=false; i++) ;
    return i;    
}

void main()
{
	int A[4]={0,-1,3,1};
	int result;
	result=firstMissingPositive(A,4);
	std::cout<<result;
	std::cin>>result;
}

class Solution {
public:
int firstMissingPositive(int A[], int n) {
        for( int i=0; i<n;  ){
            // bug fixed check if swap itself
            if( A[i]>0 && A[i]< n+1 && A[A[i]-1]!= A[i] && A[i]-1 != i)
                swap( A[i], A[A[i]-1]);
            else
                i++;
        }
    
        for( int i=0; i<n; i++){
        if(A[i] !=i+1 )
            return i+1;
        }
        return n+1;
    }
};
