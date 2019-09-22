class Solution {
public:
    bool StringMatch(const char* temp_string, const char* patt_string, int patt_length){
        bool match=false;
        for( int it=0; it<patt_length; it++){
            if(temp_string[it]!=patt_string[it])
                return match;
        }
        return (~match);
    }
    
    int StringLength(const char* string){
        int i=0;
        for( char* it=(char*)string;  (*it)!='\0'; it++,i++);
        return i;
    }
    
    char *strStr(char *haystack, char *needle) {
        bool match=false;
        if( (*needle)=='\0')
            return haystack;
        else if( (*haystack)=='\0')
            return NULL;
            
        int temp_length=0, patt_length=0;
        temp_length=StringLength(haystack);
        patt_length=StringLength(needle);
        
        for( int i=0; i<=(temp_length-patt_length); i++){
            match=StringMatch(haystack+i,needle,patt_length);
            if(match)
                return haystack+i; // or using refernce operator treat as an array "&haystack[i]"
        }
        
        return NULL; // not match
    }
};
