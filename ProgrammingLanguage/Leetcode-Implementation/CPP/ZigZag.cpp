string convert(string s, int nRows) {
    // Start typing your C/C++ solution below
    // DO NOT write int main() function   
    if( s.length() < 3 || nRows==1)
        return s;

    vector< vector<char> > matrix(nRows);
    bool down=true;
    int length=s.length();
    for( int c=0, row=0; c< length; /*nothing*/ ){
        if(down){
            if(row<nRows){
                matrix[row++].push_back( s[c++]);
            }
            else{
                row -=2;
                down=false;
            }
        }
        else{
            if(row>=0){
                matrix[row--].push_back( s[c++] );
            }
            else{
                row +=2;
                down=true;
            }
        }
    }
    string result="";
    vector<vector<char>>::iterator it=matrix.begin();
    for( /* nothing */; it!=matrix.end(); it++){
		vector<char>::iterator it2=(*it).begin();
        for( /* nothing */; it2!= (*it).end(); it2++){
            result.push_back(*it2); // or using result +=(*it2);
        }
    }
    return result;
}
