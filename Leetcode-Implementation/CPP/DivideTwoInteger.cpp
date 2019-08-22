Not handling 123455/1 slow problem

class Solution {
public:
    int AbstractNum( int a){
        return a<0 ? (0-a) : a;
    }
        
    bool DiffSigned( int a, int b){
        if( (a>0 && b<0)
          ||(a<0 && b>0))
            return true;
        else
            return false;
    }

    int divide(int dividend, int divisor) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(divisor==0)
            return 0;
            
        bool diff_signed=DiffSigned(dividend,divisor);
        
        if(dividend<0)
            dividend=AbstractNum(dividend);
        if(divisor<0)
            divisor=AbstractNum(divisor);
            
        int div=0;
    	for(dividend-=divisor; dividend>=0;dividend-=divisor, div++) ;
        
        if(dividend==0)
            div++;
        return diff_signed ? (0-div) : div;    
    }
};


class Solution {
public:
    int divide(int dividend, int divisor) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        
        long long a=abs((double)dividend);
        long long b=abs((double)divisor);

        
        long long result=0;
        
        
        int pos=0;
        for( ; (b<<1)<=a; b<<=1, pos++) ;

        for( ; pos>=0; b>>=1,pos--){
            if( a>=b ){
                a -=b;
                result |= 1<<pos;
            }
        }
        
        return ((dividend^divisor)>>31) ? (-result) : result;
    }
};

