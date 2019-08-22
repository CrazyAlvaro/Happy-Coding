class Solution {
public:
    int lengthOfLastWord(const char *s) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int count = 0;
        int prev = 0;
        while( *s != NULL ){
            if( *s == ' '){
                if(count != 0 )
                    prev = count;
                count = 0;
            }
            else
                count++;
                
            s++;
        }
        if( count != 0 )
            return count; 
        else
            return prev;
    }
};

void main(){
  Solution test;
  test.lengthOfLastWord("abdagdsa");
}
