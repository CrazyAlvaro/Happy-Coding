Given numRows, generate the first numRows of Pascal's triangle.

For example, given numRows = 5,
Return

[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]

// Question Description above

class Solution {
public:
    vector<vector<int> > generate(int numRows) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        vector<vector<int>> ret;
        vector<int> row;
        for( int i = 1; i <= numRows; i++ )
            PascalGenerator( i, row, ret );
        
        return ret;
    }
    
    void PascalGenerator( int n, vector<int> & prev, vector<vector<int>> &ret ){
        vector<int> temp;
        
        if( n == 1 || n == 2 ){
            for( int i = 0; i < n; i++)
                temp.push_back(1);
            
            ret.push_back(temp);
            prev=temp;
            temp.clear();
        }
        else{
            
            temp.push_back( 1 );
            for( int i = 1; i < n -1 ; i++)
                temp.push_back( prev[i-1] + prev[i] );
            temp.push_back( 1 );
            
            ret.push_back( temp );
            prev = temp;
            temp.clear();
        }
    }
};
