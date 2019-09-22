class Solution {
public:
    double pow(double x, int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        double ret=1.0;
        size_t count=( n>=0 ? n : -n );
        if(x==-1)
            return count%2==1 ? -1 :1;
        
        double prev=0;
        for( int i=0; i<count; i++){
            ret=ret*x;
            if( (ret-prev)< 0.000000000001 && (ret-prev) > -0.000000000001 )
                return ret;
            prev=ret;
                
        }
        return n>0? ret : 1.0/ret;
    }
};
