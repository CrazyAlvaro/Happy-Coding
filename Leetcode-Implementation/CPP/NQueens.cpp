class Solution {
public:
    vector<vector<string> > solveNQueens(int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<int> chess;
        for( int i=0; i < n; i++ )
            chess.push_back(i);

        vector<vector<int>> permutations;
        PermsGenerator( chess, 0,  permutations );
        //permutations=CheckNQueens( permutations );
        vector<vector<string>> ret = ChessGenerator( permutations );
		permutations.clear();
        return ret;    
    }
    
    void PermsGenerator( vector<int> &chess, int offset, vector<vector<int>> &perms){
		if( offset == chess.size() && CheckNQueensHelp(chess) ){
            perms.push_back( chess );
		}
        
        for( int i=offset; i<chess.size(); i++){
            Swap( chess, offset, i );
            PermsGenerator( chess, offset+1, perms);
            Swap( chess, offset, i );
        }
    }
    
    void Swap( vector<int> &num, int &a, int &b){
        if( a== b )
            return ;
        int temp = num[b];
        num[b]=num[a];
        num[a]=temp;
    }
    
  //  vector<vector<int>> CheckNQueens( vector<vector<int>> & perms ){
		//vector<vector<int>> ret;
  //      for( vector<vector<int>>::iterator it = perms.begin(); it != perms.end(); it++){
  //          if( CheckNQueensHelp( *it ) )
		//		ret.push_back(*it);
  //      }
		//return ret;
  //  }
    
    bool CheckNQueensHelp( vector<int> &chess){
        for( size_t i=0; i < chess.size(); i++ ){
            for( size_t j = i+1; j < chess.size(); j++ ){
                if( j - i == chess[j] - chess[i] || j - i == chess[i] - chess[j] )
                    return false;
            }
        }
        return true;
    }
    
    vector< vector<string> > ChessGenerator( vector<vector<int>> &perms ){
		vector<vector<string>> ret;
		if( perms.size() == 0 )
			return ret;
        int size = perms[0].size();
        vector<string> temp;
        
        for( size_t i=0; i< perms.size(); i++){
            temp.clear();
            for( int j=0; j < size; j++)
                temp.push_back( ChessString( perms[i][j], size ) );
            ret.push_back(temp);
        }
        
        return ret;
    }
    
    string ChessString( int &n, int &size){
        string ret;
        for( size_t i=0; i<size; i++){
            if( i == n )
                ret += "Q";
            else
                ret += ".";
        }
        return ret;
    }
};
