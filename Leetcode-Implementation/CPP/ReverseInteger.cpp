class Solution {
public:
    int reverse(int x) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        bool negative=false;
        if( x==0)
            return x;
        //if( x<0)
        //    negative=true;
        
        int result=0;
        while( x!= 0){
            result *=10;
            result += (x%10);
            x /=10;
        }
        //if(negative)
        //    result= 0- result;
        return result;
        
    }
};

    
