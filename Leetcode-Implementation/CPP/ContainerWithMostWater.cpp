//My implementation: O(N*N) time out

    int maxArea(vector<int> &height) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int n=height.size();
        if( n<2 )
            return 0;
        
        int max=0, h=0;
        for( size_t i=0; i<n; i++){
            for( size_t j=i+1; j<n; j++){
                if( height[i]>= height[j] )
                    h=height[j];
                else
                    h=height[i];
                if( ( h* (j-i) ) > max)
                    max=h*(j-i);
            }
        }
        return max; 
    }


// Hint: using two index from both sides

// Final : O(N)

  int maxArea(vector<int> &height) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        size_t le=0, ri=height.size()-1;
        int max=0, lastH=0;
        
        while( le != ri ){
            if( height[le] >= height[ri] ){
                if( height[ri]>lastH && height[ri]*(ri-le) > max){
                    max=height[ri]*(ri-le);
                    ri--;
                }
                else
                    ri--;
            }
            else{
                if( height[le]>lastH && height[le]*(ri-le)>max){
                    max=height[le]*(ri-le);
                    le++;
                }
                else
                    le++;
            }
        }
        return max;
    }
