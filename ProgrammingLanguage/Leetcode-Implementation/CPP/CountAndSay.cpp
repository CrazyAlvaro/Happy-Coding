class Solution {
public:
    string IntToStr(int n){
        string ret;
        stringstream convert;
        convert<<n;
        ret=convert.str();
        return ret;
    }
    
    string ReadNum(string num){
		string ret="";
		const char* str=num.c_str();
        while( *str!='\0' ){
            char t_char=*str;
            int i;
            for( i=0; *str == t_char; i++, str++) ;            
            ret+=IntToStr(i);
            ret+=t_char;
        }
        return ret;
	}
    
    string countAndSay(int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
		string ret="1";
        for( int i=1; i<n; i++){
			ret=ReadNum(ret);
		}
        return ret;
    }
};
