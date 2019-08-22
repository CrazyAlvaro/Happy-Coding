class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int> > &obstacleGrid) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<vector<int>> grid = obstacleGrid;
        if( grid.size() == 0 || grid[0].size() == 0 || grid[grid.size()-1][grid[0].size()-1] == 1 
            || grid[0][0] == 1 )
            return 0;
        
        int row = grid.size(), col = grid[0].size();
        
        vector<int> path(col, 0);
        for( int it = 0; it <col; it++){
            if( grid[0][it] == 1)
                break;
            else
                path[it] = 1;
        }
        
        for( int it_row =1; it_row < row; it_row++){
            if(grid[it_row][0] == 1)
                path[0] = 0;
                
            for( int it_col = 1; it_col < col; it_col++){
                if( grid[it_row][it_col] == 1)
                    path[it_col] = 0;
                else
                    path[it_col] = path[it_col-1]+path[it_col];
            }
        } 
        return path[col-1];
    }
};
