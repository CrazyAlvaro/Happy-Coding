/*
A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
'Z' -> 26
Given an encoded message containing digits, determine the total number of ways to decode it.

For example,
Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).

The number of ways decoding "12" is 2.
*/


class Solution {
public:
    int numDecodings(string s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        for( int i =0; i< s.size(); i++){
            if( s[i] <'0' || s[i] >'9' )
                return 0;
        }
        if( s.size() == 0 ) return 0;
        
        vector<int> res( s.size(), 0 );
        char prev;
        
        for( int i = 0; i< s.size(); i++){
            if( i == 0 ){
                if( s[i] == '0' )
                    return 0 ;
                else{
                    prev = s[i];
                    res[i] = 1;
                    continue;
                }
            }
            else if( i == 1 ){
                if( s[i] == '0' && (prev >'2' || prev <'1'))
                    return 0;
                else if( prev == '1'&& s[i]!='0' || prev =='2' && s[i] <='6'&& s[i] >'0' ){
                    prev = s[i];
                    res[i] = 2;
                }
                else{
                    prev = s[i];
                    res[i] = 1;
                }
                
            }
            else{ // i>1
                if( s[i] == '0' && (prev > '2' || prev < '1'))
                    return 0;
                else if( prev == '1'&& s[i]!='0' || prev =='2' && s[i] <='6' && s[i] > '0' ){
                    prev = s[i];
                    res[i] = res[i-1] + res[i-2];
                }
                else{
                    prev = s[i];
                    if( s[i] == '0' )
                        res[i] = res[i-2];
                    else
                        res[i] = res[i-1];
                }
            }
        }
        return res[s.size() -1 ] ;
    }
};

void main(){
  Solution test;
  test.numDecodings("101010");
  test.numDecodings("100");
  test.numDecodings("1111");
}
