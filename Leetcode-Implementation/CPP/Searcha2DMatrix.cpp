class Solution {
public:
    bool searchMatrix(vector<vector<int> > &matrix, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        // M * N matrix
        if( matrix.size() == 0 )
            return false;
        int m = matrix.size();
        int n = matrix[0].size();
        
        // using binary search to find the row target may stay in
        // target >= matrix[i][0] target < matrix[i+1][0]
        int start = 0, end = m - 1;
        int temp;
        while ( start != end ){
            temp = ( start + end ) / 2; 
            if( target == matrix[temp][0] )
                return true;
            else if( target > matrix[temp][0]){
                if( start == temp ){
                    if( target >= matrix[temp+1][0] )
                        start++;
                    break;
                }
                else
                    start = temp;
            }
            else
                end = temp;
        }
        int row = start;
        start = 0;
        end = n - 1;
        
        while( start != end ){
            temp = ( start + end ) / 2;                
            if( target == matrix[row][temp] )
                return true;
            else if ( target > matrix[row][temp] ){
                if ( temp == start )
                    start ++ ;
                else
                    start = temp;
            }
            else
                end = temp;
        }
        
        if ( matrix[row][start] == target )
            return true;
        else
            return false;
    }
};
