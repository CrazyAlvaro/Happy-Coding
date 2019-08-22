/*

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

*/

#include<vector>
using namespace std;

class Solution {
public:
    int minPathSum(vector<vector<int> > &grid) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        if( grid.size() < 1 || grid[0].size() < 1)
            return -1;
        
        vector<int> col( grid.size(), 0 );
        int prev = 0; 
        for( int i = 0; i < grid.size(); i++){
            col[i] = prev + grid[i][0];
            prev = col[i];
        }
        
        for( int i = 1; i < grid[0].size(); i++){
            col[0] = col[0] + grid[0][i];
            for( int j = 1; j < grid.size(); j++){
                col[j] = (col[j-1] < col[j] ? col[j-1] : col[j] ) + grid[j][i];
            }
        }
        return col[grid.size() -1];
    }
};

void main(){
  Solution test;
	vector<int> fi;
	fi.push_back(1);
	fi.push_back(2);
	fi.push_back(5);

	vector<int> se;
	se.push_back(3);
	se.push_back(2);
	se.push_back(1);
	vector<vector<int>> testGrid;
	testGrid.push_back(fi);
	testGrid.push_back(se);

	int ret;
	ret = test.minPathSum(testGrid);
}
