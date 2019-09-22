/*
Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.

For example,
Given the following matrix:

[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]

You should return [1,2,3,6,9,8,7,4,5].
*/

class Solution {
public:
    vector<int> spiralOrder(vector<vector<int> > &matrix) {
        // think every rectangle  as a single problem
        // using revursive way to solve inner rect
        
        // written in iterative way
        vector<int> ret;
        if( matrix.size() == 0 || matrix[0].size() == 0 )
            return ret;
        
        int row_begin = 0, row_end = matrix.size() - 1;
        int col_begin = 0, col_end = matrix[0].size() - 1;
        
        while( true ){
            // from top left
            for( int i = col_begin; i <= col_end;  i++ )
                ret.push_back( matrix[row_begin][i] );    
                
            if( ++row_begin > row_end ) return ret;
                
            // from top right
            for( int i = row_begin; i <= row_end; i++ )
                ret.push_back( matrix[i][col_end] );
                
            if( --col_end < col_begin ) return ret;
                
            // from bottom right
            for( int i = col_end ; i >= col_begin; i-- )
                ret.push_back( matrix[row_end][i] );
                
            if( --row_end < row_begin ) return ret;
                
            // from bottom left
            for( int i = row_end ; i >= row_begin; i-- )
                ret.push_back( matrix[i][col_begin] );
                
            if( ++col_begin > col_end ) return ret; 
        }
    }
};
