//前后线性扫描的办法

class Solution {
public:
    void GetPrevProfit( const vector<int> &prices, vector<int> &prev ){
        int lowest=prices[0];
        int profit=-1;

        for( int i=0; i < prices.size(); i++){
            if( prices[i] < lowest ){
                lowest=prices[i];
                prev.push_back( profit );
            }
            else if( ( prices[i] - lowest ) > profit ){
                profit = prices[i] -lowest;
                prev.push_back ( profit );
            }
            else
                prev.push_back( profit );
        }
    }
    
    int GetFutureProfit( const vector<int> &prices, vector<int> &prev ){
        int maxProfit = -1;
        int highest = prices [ prices.size() - 1 ];
        int profit = -1;
        
        for ( int i = prices.size() - 1;  i >= 0; i -- ){
            if ( prices[i] > highest )
                highest = prices[ i ];
            else if ( ( highest - prices[ i ] ) > profit )
                profit = highest - prices[ i ];
            else
                ;
                
            if( ( profit + prev[ i ] ) > maxProfit )
                maxProfit = profit + prev[i];
        }
        
        return maxProfit;
    }
    int maxProfit(vector<int> &prices) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( prices.size() <=1 )
            return 0;
        
        vector<int> prev;
        GetPrevProfit( prices, prev );
        
        return GetFutureProfit( prices, prev );        
    }
};
