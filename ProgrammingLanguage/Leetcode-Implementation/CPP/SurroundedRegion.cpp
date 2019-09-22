// using breath first search


#include<vector>
using namespace std;

class Solution {
public:
    int row, col;
    
    void solve(vector<vector<char>> &board) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( board.size() == 0 || board[0].size() == 0 )
            return ;
            
        row = board.size();
        col = board[0].size();
        
        for( int it = 0; it < col; it++ )
        {
          solveHelp( board, 0, it );
			    solveHelp( board, row-1, it);
		    }
        
        for( int it = 1; it < row-1 ; it ++)
        {
            solveHelp( board, it, col-1);
			      solveHelp( board, it, 0);
		    }
                
        for( int num_r = 0; num_r < row; num_r++){
            for( int num_c = 0; num_c < col; num_c++){
                if( board[num_r][num_c] == 'E' )
                    board[num_r][num_c] = 'O';
				        else if( board[num_r][num_c] == 'O' )
					          board[num_r][num_c] = 'X';
					   }
        }
            
    }
    
    void solveHelp( vector<vector<char>> &board, int num_row, int num_col){
        // check this position's validation
        if(  num_row >= row || num_row <0 || num_col >= col || num_col <0  
				|| board[num_row][num_col] != 'O' )
            return;
        
        board[num_row][num_col] = 'E'; // set this position to flag 'E'
    
        solveHelp( board,  num_row-1, num_col);
        solveHelp( board,  num_row+1, num_col);
        solveHelp( board,  num_row, num_col-1);
        solveHelp( board,  num_row, num_col+1);
    }
};

void main(){
  Solution test;
	vector<char> line (1,'O');
	vector<vector<char>> board(1,line);
	test.solve(board);
}
