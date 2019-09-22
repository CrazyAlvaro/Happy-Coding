// each step, we only have two possible choice, '(' or ')', only the number of '(' bigger than the number of ')', we can add a ')''

class Solution {
public:
    vector<string> generateParenthesis(int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        // given n pairs of parentheses
        vector<string> result;
        if( n>0 )
            ParenthesesGenerator(result, "", 0,0,n);
        return result;
            
        
    }
    void ParenthesesGenerator( vector<string> &ret, string s, int l, int r, int n){
        if( l==n ) {// number of ( equals n 
            ret.push_back( s.append( n-r, ')'));
            return ;
        }
        
        ParenthesesGenerator( ret, s+'(', l+1, r, n);
        if( l>r ) // can add a ')'
            ParenthesesGenerator( ret, s+')', l, r+1,n);
    }
};
