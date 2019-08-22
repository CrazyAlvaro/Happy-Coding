// using breath first search

class Solution {
public:
    int ladderLength(string start, string end, unordered_set<string> &dict) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function        
        queue<string> tempStr;
    	queue<string> queueStr;
        
        int ret=0;
        if( start == "" || end == "" || dict.size() == 0 )
            return ret;
        
        if( dict.count( start ) ==0 )
            return ret;
        
        queueStr.push(start);
	while (!queueStr.empty() ){ 
		while (!queueStr.empty() ){
			tempStr.push(queueStr.front() );
			queueStr.pop();
		}
		ret++; 
		while( !tempStr.empty() ){
			string str;
			str=tempStr.front();
			tempStr.pop();    
			unordered_set<string>::iterator it;
			for( int i=0; i<str.size(); i++ ){
				string key=str;
				for( int j=0; j<26; j++ ){
					if( str[i] == (char) ('a'+ j ) )
						continue;
					key[i]=(char) ('a'+ j ); // change one character in this string
					it=dict.find(key);
					if( it == dict.end() )
						continue;
					if( *it == end )
						return ++ret;
					queueStr.push(*it);
					dict.erase(it);
				}
			}
		}
	}  
        return 0;
    }
};
