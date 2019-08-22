class Solution {
public:
    vector<vector<int> > permuteUnique(vector<int> &num) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function      
        vector<vector<int>> uniquePerms;
        //unordered_set<int> dupNum;
        UniquePermHelp( num, 0, uniquePerms);
        return uniquePerms;
    }
    
    void UniquePermHelp( vector<int> &num, int offset, vector<vector<int>> & ret /*，unordered_set<int> &dupNum */){
        if( offset == num.size() ){
            ret.push_back( num );
            return ;
        }
        
        unordered_set<int> dupNum;
        unordered_set<int>::iterator it;
        
        for( int i=offset; i< num.size(); i++){
            it=dupNum.find( num[i] );
            if( it!=dupNum.end() )
                continue;
            dupNum.insert( num[i] );
            Swap( num, offset, i);
            UniquePermHelp( num, offset+1, ret );
            Swap( num, offset, i);   
        } 
        dupNum.clear();
    }
    
    void Swap( vector<int> &num, int &a, int &b){
        if( a == b )
            return ;
        int temp=num[a];
        num[a]=num[b];
        num[b]=temp;
    }
};
