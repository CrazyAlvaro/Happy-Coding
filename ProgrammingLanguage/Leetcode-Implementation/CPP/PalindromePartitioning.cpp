// 递归 DFS  解法

class Solution {
public:
    vector<vector<string>> partition(string s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<string> strs;
        vector<vector<string>> ret;
        
        PartitionHelp( s, 0, strs, ret);
        return ret;
    }
    
    void PartitionHelp( string &s, int start, vector<string> &strs, vector<vector<string>> &ret ){
        if( start == s.size() ){
            ret.push_back( strs );
            return ;
        }
        
        for( int i = start; i< s.size(); i++ ){
            if( IsPalindrome( s, start, i ) ){
                string str(s, start, i - start + 1 );
                strs.push_back( str );
                PartitionHelp( s, i + 1, strs, ret );
                strs.pop_back();
            }
        }
    }
    
    bool IsPalindrome( string &s, int start, int end ){
        while( start < end ){
            if( s[start] != s[end] )
                return false;
                
            start ++;
            end --;
        }
        return true;
    }
};
