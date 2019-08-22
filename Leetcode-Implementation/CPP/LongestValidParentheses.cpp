class Solution {
public:
    int longestValidParentheses(string s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        // mark valid parentheses, then count continuous 
        int length=0;
        stack<int> parens;
        for( int i=0; i<s.size(); i++){
            if(s[i]=='(')
                parens.push(i);
            else{
                if( !parens.empty()){
                    s[i]='y';
                    s[parens.top()]='y';
                    parens.pop();
                }
            }
        }
        
        int count=0;
        for( int i=0; i<s.size(); i++){
            if( s[i]=='y'){
                count++;
                if(count>length)
                    length=count;
            }
            else
                count=0;
        }
        
        return length;
    }
};
