class Solution {
public:
    int uniquePaths(int m, int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( m < 1 || n <1)
            return -1;
        vector<int> path(n,1);
        
        for( int row= 1; row < m; row++){
            for( int col = 1; col < n; col ++){
                path[col]= path[col-1] + path[col];
            }
        }
        return path[n-1];    
    }
};

void main(){
  Solution test;
  test.uniquePaths(5,6);
}
