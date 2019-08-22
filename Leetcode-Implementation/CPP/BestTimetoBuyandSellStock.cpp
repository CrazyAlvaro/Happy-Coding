class Solution {
public:
    int maxProfit(vector<int> &prices) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( prices.size() <2)
            return 0;
            
        int result=0;
        int min=prices[0];
        for( int i=1; i<prices.size(); i++){
            if( prices[i]<min){
                min=prices[i];
                continue;
            }
            else if( prices[i]-min > result)
                result=prices[i]-min;
            else
                ;
        }
        
        return result;
    }
};
