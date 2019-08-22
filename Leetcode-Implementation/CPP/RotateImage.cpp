class Solution {
public:
    void rotate(vector<vector<int> > &matrix) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        // new row= old column
        // new column = size - old row
        if( matrix.size() < 2 )
            return ;
        else if( matrix.size() != matrix[0].size() )
            return ;
        else
            ;
        
        int size = matrix.size() - 1;
        int temp;
        for( int i=0; i <= size / 2; i ++){ // i for old row
            for( int j = i; j < ( size - i ); j++ ){
                if( j == i && j == size -j) // for center point
                    break;
                temp = matrix[i][j];
                matrix[i][j] = matrix[size-j][i];
                matrix[size-j][i] = matrix[size-i][size-j];
                matrix[size-i][size-j] = matrix[j][size-i];
                matrix[j][size-i] =temp; // old matrix[i][j]
            }
        }
    }
};
