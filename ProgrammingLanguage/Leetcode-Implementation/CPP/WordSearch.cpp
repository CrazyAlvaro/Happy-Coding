class Solution {
public:
    bool ret;
    bool exist(vector<vector<char> > &board, string word) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ret = false;
        if( board.size() == 0 || word.size() == 0 )
            return ret;
        int row = board.size();
        int col = board[0].size();
        char ch;
        for(int i = 0; i< row; i++){
            for( int j = 0; j < col; j++){
                if( board[i][j] == word[0] ){  
                    ch = board[i][j];
                    board[i][j] = '#';
                    Search( board, i, j, word, 1);
                    board[i][j] = ch;
                }
            }
        }
        return ret;
    }
    
    // i, j stand for row number and column number
    void Search( vector<vector<char>> & board, int i, int j, string & word, int pos){
        if( pos == word.size() || ret == true){
            ret = true;
            return ;
        }
        char ch;
        if( WithinRange(board,i+1,j) && board[i+1][j] == word[pos] ){
            ch = board[i+1][j];
            board[i+1][j] = '#';
            Search( board, i+1, j, word, pos+1);
            board[i+1][j] = ch;
        }
        if( WithinRange(board,i-1,j) && board[i-1][j] == word[pos] ){ 
            ch = board[i-1][j];
            board[i-1][j] = '#';
            Search( board, i-1, j, word, pos+1);
            board[i-1][j] = ch;
        }
        if( WithinRange(board,i,j+1) && board[i][j+1] == word[pos] ){ 
            ch = board[i][j+1];
            board[i][j+1] = '#';
            Search( board, i, j+1, word, pos+1);
            board[i][j+1] = ch;
        }
        if( WithinRange(board,i,j-1) && board[i][j-1] == word[pos] ){ 
            ch = board[i][j-1];
            board[i][j-1] = '#';
            Search( board, i, j-1, word, pos+1);
            board[i][j-1] = ch;
        }
    }
    
    // check if row and col withnin range
    bool WithinRange(vector<vector<char>> &board, int row, int col){
        if( row >=0 && row < board.size() && col >=0 && col < board[0].size() )
            return true;
        else
            return false;
    }
};
