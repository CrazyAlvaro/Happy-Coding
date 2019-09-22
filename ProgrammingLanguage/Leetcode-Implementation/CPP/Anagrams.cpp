class Solution {
public:
    vector<string> anagrams(vector<string> &strs) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<string> ret;
        map<string, vector<string> > dict;
        
        vector<string>::iterator it;
        string str;
        for( it=strs.begin(); it != strs.end(); it++){
            str= *it;
            sort( str.begin(), str.end() );
            dict[str].push_back( *it );
        }
        
		map<string, vector<string>>::iterator mit;
        for( mit= dict.begin(); mit !=dict.end(); mit++)
            if( mit->second.size() > 1 )
                for( it = mit->second.begin(); it != mit->second.end(); it ++)
                    ret.push_back( *it );
        
        return ret;
    }
};
