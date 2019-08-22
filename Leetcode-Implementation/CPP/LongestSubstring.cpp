//My original implementation: Brute Force method

int lengthOfLongestSubstring(std::string s) {

	if(s=="")
		return 0;

	std::string::iterator it_start=s.begin(), it_now=s.begin(), iterator;
    int max_length=1;
	//int length;
	for( ; it_now!= s.end(); it_now++){  // "\0" terminate
		//length=1;
        for( iterator=it_start; iterator!=it_now; iterator++){
			
            if( *iterator == *it_now){
                max_length= (it_now-it_start) > max_length ? (it_now-it_start) : max_length;
                it_start=iterator+1;
				break;
            }
			//length++;
			                 //   store length ortherwise "abcd" will exit as 1
        }	
		//max_length= (it_now-it_start) > max_length ? (it_now-it_start): max_length;
    }
	// now it_now reach the end
	max_length= (it_now-it_start) > max_length ? (it_now-it_start): max_length;
	
	return max_length;
}

// Time performance: O(n*n)


// Final Implementation: using two iterator to check O(2n)=O(n)
// Using a table to store exist characters

int lengthOfLongestSubstring(std::string s) {
        int i=0, j=0, max_length=0;
        int n=s.length();
        bool exist[256]={false};
        while(j < n){
            if( exist[s[j]] ){
                max_length=std::max( max_length, j-i);
                while( s[i]!=s[j]){
                    exist[s[i]]=false;
                    i++;
                }
				i++;
				j++;
            }
            else{
                exist[s[j]]=true;
                j++;
            }
        }
        max_length=std::max(n-i,max_length);
        return max_length;
 }
