class Solution {
public:
    string longestCommonPrefix(vector<string> &strs) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(strs.size() ==0)
            return "";
            
        //size_t i=0;
        string result=strs[0];
        string temp="";
        for( size_t i=0; i<strs.size(); i++){
            temp=strs[i];
            size_t j=0;
            while( j<result.size() && j<temp.length() ){
                if(result[j] == temp[j])
                    j++;
                else
                    break;
            }
            while( result.size() >j )
                result.pop_back();
        }
        return result;
        
    }
};
