class Solution {
public:
    int totalNQueens(int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int full = 1<<n;
        full -= 1;
        int ret=0;
        NQueen( 0, 0, 0, ret, full);
        return ret;
    }
    
    void NQueen( int row, int ld, int rd, int &count, const int &full){
        int pos, p;
        
        if( row != full ){
            pos = full & ( ~ ( row | ld | rd ) );   // can be put Queen
            while( pos != 0 ){
                p = pos & ( -pos );                 // get the right first position of the pos ('1')
                pos = pos -p;                       // delete this position from pos
                NQueen( row + p, (ld + p) << 1, (rd + p) >> 1, count, full);
            }
        }
        else
            count++;
    }
};
