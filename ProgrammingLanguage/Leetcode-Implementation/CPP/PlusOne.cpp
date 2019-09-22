Given a number represented as an array of digits, plus one to the number.

// Question Description above

class Solution {
public:
    vector<int> plusOne(vector<int> &digits) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int ten;
        vector<int>::iterator it = digits.end();
        it --;
        ten = 1;
        while ( it != digits.begin() && ten == 1 ){
            ten = ( ten + (*it) ) / 10;
            *it = ( 1 + (*it) ) % 10;
            it --;
        }
        if( ten == 1 ){
            ten = ( ten + (*it) ) / 10;
            *it = ( 1 + (*it) ) % 10;
        }
        if( ten == 1 )
            digits.insert( digits.begin(), 1 );
        return digits;
    }
};
