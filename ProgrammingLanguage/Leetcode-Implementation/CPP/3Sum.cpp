class Solution {
public:
    vector<vector<int> > threeSum(vector<int> &num) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        int size = num.size();
        vector<vector<int>> ret;
        if( size < 3 )
            return ret;
            
        sort( num.begin(), num.end() );
        vector<int> triplet(3, 0);
        
        for( int i = 0; i < size; i++){
            int j = i +1, k = size -1;
            
            // Avoid duplication
            if( i > 0 && num[i] == num[i-1] )
                continue;
            
            while( j < k ){
                if( num[j] + num[k] + num[i] > 0 ){
                    k--;
                }
                else if( num[j] + num[k] + num[i] < 0 ){
                    j++;
                }
                else{
                    triplet[0] = num[i];
                    triplet[1] = num[j];
                    triplet[2] = num[k];
                    ret.push_back( triplet );
                    
                    do{
                        j++;
                    }while( num[j]==num[j-1] && j < k);
                    do{
                        k--;
                    }while( num[k] == num[k+1] && k > j );
                }
            }
        }
        return ret;
            
    }
};
