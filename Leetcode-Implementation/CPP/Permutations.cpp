class Solution {
public:
    vector<vector<int> > permute(vector<int> &num) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<vector<int>> permutations;
        PermuteHelp( num, 0, permutations);
        return permutations;
    }
    
    void PermuteHelp( vector<int> &num, int offset, vector<vector<int>> &perms ){
        if( offset == num.size() ){
            perms.push_back( num );
            return ;
        }
        
        for( int i=offset; i < num.size(); i++){
            Swap( num, offset, i );
            PermuteHelp( num, offset+1, perms);
            Swap( num, offset, i );
        }
    }
    
    void Swap( vector<int> &num, int &a, int &b){
        if( a == b )
            return ;
            
        int temp=num[b];
        num[b] = num[a];
        num[a] = temp;
    }
};
