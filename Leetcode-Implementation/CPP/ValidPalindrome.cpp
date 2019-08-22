/*
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

For example,
"A man, a plan, a canal: Panama" is a palindrome.
"race a car" is not a palindrome.

Note:
Have you consider that the string might be empty? This is a good question to ask during an interview.

For the purpose of this problem, we define empty string as valid palindrome.
*/

class Solution {
public:
        char ToLowerCase(char mc){
        if(mc >='A' && mc<= 'Z'){
            mc -=('A'-'a');
        }
        return mc;
    }
    
    bool IsDigitOrNum(char mc){
        if( mc>='a' && mc<='z')
            return true;
        else if( mc>='A' && mc<='Z')
            return true;
        else if( mc>='0' && mc<='9')
            return true;
        else
        return false;
    }
    
    bool isPalindrome(string s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(s=="" || s==" ")
            return true;
            
        int _ft=0, _ba=s.length()-1;
        
        while(_ft<_ba){
            while( ! IsDigitOrNum( s[_ft]) && _ft<_ba){
                _ft++;
            }
            
            if( _ft==_ba)
                return true;
            while( !IsDigitOrNum(s[_ba]) ){
                _ba--;
            }
            
            if( ToLowerCase(s[_ft]) != ToLowerCase(s[_ba]) )
                return false;
    		else{
				_ft++;
				_ba--;
			}
        }
        return true;
    }
};
