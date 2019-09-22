Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.

For example, given the following triangle

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).

Note:
Bonus point if you are able to do this using only O(n) extra space, where n is the total number of rows in the triangle.

// Question Description above

class Solution {
public:
    int minimumTotal(vector<vector<int> > &triangle) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        vector<int> sum;
        for( vector<vector<int>>::iterator outIt = triangle.begin(); outIt != triangle.end(); outIt ++ )
            CalculatePath( *outIt, sum ); 
        
        int minPath = INT_MAX;
        for( vector<int>::iterator it = sum.begin(); it != sum.end(); it ++)
            if( *it < minPath )
                minPath = *it;
        
        return minPath;
        
    }
    
    void CalculatePath( const vector<int> &row, vector<int> &sum ){
        if( row.size() == 1 ){
            sum.push_back( row [0] );
            return ;
        }
        else{
            sum.push_back( row[ row.size() -1 ] + sum[ sum.size() -1 ] ); // add the end node
            for( int i = sum.size() - 2; i > 0; i-- ){
                if( sum[i] < sum[i-1] )
                    sum[i] = sum[i] + row[i];
                else
                    sum[i] = sum[i-1] + row[i];
            }
            sum[0] = sum[0] + row[0];
        }
    }
};
