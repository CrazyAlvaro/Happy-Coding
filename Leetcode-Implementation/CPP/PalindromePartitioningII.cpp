Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

For example, given s = "aab",
Return 1 since the palindrome partitioning ["aa","b"] could be produced using 1 cut.

// Question description above

class Solution {
public:
    int minCut(string s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int leng = s.size();
      vector<int> count;
        for( int i=0; i < s.size(); i++)
			count.push_back(i);
        
		vector<bool> temp;
        vector<vector<bool>> palin;
        for( int i=0; i<s.size(); i++)
			temp.push_back(false);
		for( int i=0; i<s.size(); i++)
			palin.push_back(temp);
        
        for( int i=0; i < s.size(); i++ ){
            for( int j = i; j >= 0; j -- ){
                if( s[i] == s[j] && ( i-j < 2 || palin[ j+1 ][ i-1 ] ) ){
                    palin[j][i] = true;
                    if( j == 0 )
                        count[i] = 0;
                    else
                        count[i] = min( count[i], count[j-1] + 1 );
                }
            }
        }       
        return count[s.size()-1];
    }
};
