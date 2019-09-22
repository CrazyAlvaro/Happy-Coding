

bool isPalindrome(int x) {
    // Start typing your C/C++ solution below
    // DO NOT write int main() function
    if( x<0 )
        return false;
            
    int mod_num=1;
    while( x / mod_num >= 10 ){
        mod_num *=10;
    }
	// for (int mod_num=1; x/mode_num >=10; mod_num *=10) ;
        
    while( x!=0 ){
        if( x/mod_num != x%10 )
            return false;
        else{
            x %= mod_num;
            x /=10;
            mod_num /=100;// this is a key step, no need to recalculate mod_num again, which may lead to mistake
        }
    }
    return true;
 }


//Another approach: using recursive, pretty neat

bool isPalindrome(int x, int &y) {
  if (x < 0) return false;
  if (x == 0) return true;
  if (isPalindrome(x/10, y) && (x%10 == y%10)) {
    y /= 10;
    return true;
  } else {
    return false;
  }
}

bool isPalindrome(int x) {
  return isPalindrome(x, x);
}
