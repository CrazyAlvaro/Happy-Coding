//Say you have an array for which the ith element is the price of a given stock on day i.

//Design an algorithm to find the maximum profit. You may complete as many transactions 
//as you like (ie, buy one and sell one share of the stock multiple times). However, 
//you may not engage in multiple transactions at the same time 
//(ie, you must sell the stock before you buy again).

class Solution {
public:

    void SellCheck( int & buyPrice, int &prev, int & today, int &sum){
        if( prev> today){ // sell this stock
            sum+=(prev-buyPrice);
            buyPrice=-1;
            prev=today;
            //prevSmall=today;
        }
        else{ // price is going up
            prev=today;
        }
    }
    
    void BuyCheck( int &buyPrice, int &prev, int & today){
        if( prev < today ){ // buy this yesterday
            buyPrice=prev;
            prev=today;
        }
        else{ // remain or going down
            prev=today;
        }
        
    }
    
    int maxProfit(vector<int> &prices) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int buyPrice, prevPri;
        int sum=0;
        if( prices.size() <2)
            return sum;
        
        // initialize var
        buyPrice=-1; // assume no price lower than 0
        prevPri=prices[0];
        //prevSmall=prevPri;
        
        for( int i=1; i<prices.size(); i++){
            if( buyPrice!=-1) // Current hold this stock
                SellCheck( buyPrice, prevPri, prices[i], sum);
            else // currently not holding this stock
                BuyCheck( buyPrice, prevPri,prices[i]);
            
        }
        
        if( buyPrice!=-1) // still hold this stock
            sum+=(prevPri-buyPrice);
        return sum;
    }
};
