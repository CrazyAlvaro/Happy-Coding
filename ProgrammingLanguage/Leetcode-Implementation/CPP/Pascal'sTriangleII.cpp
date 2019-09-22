Given an index k, return the kth row of the Pascal's triangle.

For example, given k = 3,
Return [1,3,3,1].

Note:
Could you optimize your algorithm to use only O(k) extra space?

// Question Description above

class Solution {
public:
    vector<int> getRow(int rowIndex) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<int> ret;
        if( rowIndex < 2 ){
            for( int i = 0; i <= rowIndex ; i++ ){
                ret.push_back(1);
            }
        }
        else{
            ret.push_back(1);
            ret.push_back(1);
            for( int i = 2; i <= rowIndex; i++){
                PascalHelp( ret );
            }
        } 
        
        return ret;
    }
    
    void PascalHelp( vector<int> & row ){
        row.push_back(1);
        for( int i = row.size() -2; i > 0 ; i-- ){
            row[i] = row [i] + row[i-1];
        } 
    }
};
