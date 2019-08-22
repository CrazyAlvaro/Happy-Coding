class Solution {
public:
    void SetRow( vector<vector<int>> &matrix, const int &row ){
        for( int j=0; j< matrix[row].size(); j++)
            matrix[row][j]=0;
    }
    
    void SetCol( vector<vector<int>> &matrix, const int &col){
        for( int i=0; i<matrix.size(); i++)
            matrix[i][col]=0;
    }
    void setZeroes(vector<vector<int>> &matrix) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( matrix.size() == 0 )
            return ;           
        // m*n
        int m = matrix.size();
        int n = matrix[0].size();
            
        bool firstRow=false;
        bool firstCol=false;
        
        for( int i=0; i< m;  i++ ){
            if( matrix[i][0] == 0 ){
                firstCol=true;
                break;
            }
        }
        
        for( int i=0; i< n; i++){
            if( matrix[0][i] == 0 ){
                firstRow=true;
                break;
            }
        }
        
        for( int i=1; i< m; i++){
            for( int j=1; j< n; j++){
                if( matrix[i][j] == 0 ){
                    matrix[i][0]=0;
                    matrix[0][j]=0;
                }
            }
        }
        
        for( int i=1; i<m; i++ ){
            if( matrix[i][0]==0 )
                SetRow(matrix,i);
        }
        
        for( int j=1; j<n; j++){
            if( matrix[0][j]==0)
                SetCol(matrix, j);
        }
        
        if( firstRow )
            SetRow( matrix, 0 );
        if( firstCol )
            SetCol( matrix, 0 );
    }
};
