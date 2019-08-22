class Solution {
public:
    bool ValidPair( char* first, char* second){
        assert( first!=NULL);
        assert( second !=NULL);
        char ch_first=*first, ch_second=*second;
        
        if(ch_first == '(' )
            return ch_second ==')' ? true : false;
        else if( ch_first =='[')
            return ch_second ==']' ? true : false;
        else if( ch_first == '{')
            return ch_second =='}' ? true : false;
        else
            return false;
    }
    
    bool isValid(string s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int size=s.length();
        if( size%2 ==1)
            return false; // odd number of parenthesees couldn't be valid
        stack<char*> pch_stack;   
        
        char* temp;
        for( int i=0; i<size; i++ ){
            if( s[i]=='(' || s[i]=='{'||s[i]=='[' )
                pch_stack.push(&s[i]);
            else // assume valid input
            {
                if(pch_stack.empty())
                    return false;

                temp=pch_stack.top();
                pch_stack.pop();
                if(! ValidPair(temp,&s[i]) )
                    return false;
            }
        }
        if( pch_stack.empty() )
            return true;
        else
            return false;
    }
};
