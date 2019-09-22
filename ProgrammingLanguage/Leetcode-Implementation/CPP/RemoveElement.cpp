int removeElement(int A[], int n, int elem) {
    // Start typing your C/C++ solution below
    // DO NOT write int main() function
    int count=0;

    // array initialize must be a const number
    //bool exist[n]={false};
	vector<bool> exist(n,false);
    for( int i=0; i<n; i++){
        if( A[i] !=elem ){
            count++;
            exist[i]=true;
        }
    }
    
    //
    // the sequence of argument inside for loop 
    // first statement then increase
    //
    for(int i=0, j=0; i<n; i++){
        if( exist[i]==true )
        {
            A[j++]=A[i];
        }
        
    }
        
    return count;     
}
