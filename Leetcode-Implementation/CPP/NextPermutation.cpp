class Solution {
public:
    void Swap( int &a , int &b){
        int temp=a;
        a=b;
        b=temp;
    }
    
    void ReverseVector(vector<int>& num, int start, int end){
        for( int i=0; i<=(end-start)/2; i++){
            Swap( num[start+i], num[end-i]);
        }
    }
    
    void nextPermutation(vector<int> &num) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int size=num.size();
        if( size <2)
            return ;
        
        for( int i=size-2; i>=0; i--){
            if( num[i]<num[i+1]){
                ReverseVector(num, i+1, size-1);
                for(int j=i+1; j<size; j++){
                    if(num[i]<num[j]){
                        Swap(num[i], num[j]);
                        return ;
                    }
                }
            }
        }
        
        ReverseVector(num, 0, num.size()-1);
    }
};
