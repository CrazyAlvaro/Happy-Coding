class Solution {
public:
    bool isIL;
    bool isInterleave(string s1, string s2, string s3) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function 
        
        // using recursive method to check every possibility
        if( s1.size() + s2.size() != s3.size() )
            return false;
            
        if( s3.size() == 0 )
            return true;
            
        isIL = false; 
        isILHelp( s1, 0, s2, 0, s3, 0 );
        return isIL;
    }
    void isILHelp( string &s1, int it1, string &s2, int it2, string &s3, int it3 ){
        if( it3 == ( s3.size() - 1 ) ){
            if( it1 == s1.size() -1 && s1[it1] == s3[it3] )
                isIL = true;
            if( it2 == s2.size() -1 && s2[it2] == s3[it3] )
                isIL = true;
            
            return ;
        }
        if( s1[it1] == s3[it3] ){
            isILHelp( s1, it1+1, s2, it2, s3, it3+1 );
        }
        if( s2[it2] == s3[it3] ){
            isILHelp( s1, it1, s2, it2+1, s3, it3+1 );
        }
    }
};


class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) { 
        
        if( s1.size() + s2.size() != s3.size() ) return false;
        vector<vector<bool>> isInter( s1.size()+1, vector<bool>(s2.size()+1, false) );
        
        isInter[0][0] = true;
        
        int it = 1;
        while( it <= s1.size() && s1[it-1] == s3[it-1] ){
            isInter[it][0] = true;
            it ++;
        }
        
        it = 1;
        
        while( it <= s2.size() && s2[it-1] == s3[it-1] ){
            isInter[0][it] = true;
            it ++;
        }
        
        for( int s1_it = 1; s1_it <= s1.size(); s1_it ++ ){
            for( int s2_it = 1; s2_it <= s2.size(); s2_it ++ ){
                // check if isInter[s1_it][s2_it] is true?
                // two cases
                char temp_char = s3[s1_it + s2_it -1] ;
                
                // if s1[s1_it-1] == s3[s1_it + s2_it -1], isInter[s1_it][s2_it] will be true
                // if isInter[s1_it - 1][s2_it] is true
                if( temp_char == s1[s1_it-1] )
                    isInter[s1_it][s2_it] = isInter[s1_it-1][s2_it];
                if( temp_char == s2[s2_it-1] )
                    isInter[s1_it][s2_it] = isInter[s1_it][s2_it-1] || isInter[s1_it][s2_it];
            } 
        }
        
        return isInter[s1.size()][s2.size()];
    }
};

// for this method, we could using O(N) space other than O(MN) because we can reuse the same row
// as the matrix we are using right, each position only need for the next loop, we don't have to 
// store the previous information any more, the idea behind this method is the same, also with the
// same time performance, however, with that kind of method the code, however is beyond me even after
// I myself read it several times.
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function   
        if( s1.size() + s2.size() != s3.size() )
            return false;
        
        // save space
        if( s2.size() > s1.size() ){
            string temp = s1;
            s1=s2;
            s2=temp;
        }
        
        vector<bool> isInter(s2.size()+1, false);   
        // initialize the first row
        for( int i = 0; i <= s2.size(); i++){
            if( s2.substr(0,i) != s3.substr(0,i) )
                break;
            isInter[i] = true;
        }
        
        // treat each inner loop's isInter as isInter[i][j], the isInter[i-1][j] is the same as the one
        // on the right side of the assign line inner most
        for( int i = 1; i <= s1.size(); i ++){
            isInter[0] = ( s1.substr(0,i) == s3.substr(0,i) );
            for( int j = 1; j <= s2.size(); j++){
                isInter[j]=(s2[j-1]==s3[i+j-1] && isInter[j-1] ) || ( s1[i-1]==s3[i+j-1] && isInter[j] );
            }
        }
        return isInter[s2.size()];
    }
};


void main(int argc, char* argv[]){
  Solution test;
  string s1="abcd";
  string s2="abdge";
  string s3="ababdcdge";
  bool ret=test.isInterleaving(s1,s2,s3);
  std::cout<<"Test result:"<<ret<<std::endl;
}
