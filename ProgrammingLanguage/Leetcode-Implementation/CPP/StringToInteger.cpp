int atoi(const char *str) {    // Start typing your C/C++ solution below
    // DO NOT write int main() function
    assert( str!=NULL);
    long long result=0;
        
    //////////////////////////////////////////
	//
	//	' ' char
	//	" " string
	//
	//////////////////////////////////////////
    // to skip white space
    for( /* nothing */; *str && (*str == ' '); str++)  ; 
        
    bool positive=true;
    if( *str =='\0') return result;
    else if( *str =='+'){
        positive=true;
        str++;
    }
    else if( *str=='-'){
        positive=false;
        str++;
    }
    
    while( isdigit(*str) ){
		result= result*10 + *str-'0';
        // in C library, int is 16 bits, while C++ its 32 bits
        if( positive && result>=LONG_MAX ) return LONG_MAX;
        else if( !positive && -result<= LONG_MIN) return LONG_MIN;
        else
            str++; 
    }   
    return positive ? result : -result;
}
