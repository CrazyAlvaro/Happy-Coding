/*

You are climbing a stair case. It takes n steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

*/

class Solution {
public:
    int climbStairs(int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( n < 1 )
            return -1;
            
        vector<int> steps;
        steps.push_back(1);
        steps.push_back(2);
        
        if( n < 3 )
            return steps[n-1];
            
        int temp_step;
        for( int i = 2; i < n; i++){
            temp_step = steps[i-1] + steps[i-2];
            steps.push_back( temp_step );
        }
        
        return steps[n-1];   
    }
};

void main(){

  Solution test;
  test.climbStairs(5);
}
