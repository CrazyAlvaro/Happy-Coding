/*
given n, how many structurally unique BST's (binary search trees) that store values 1...n?

For example,
Given n = 3, there are a total of 5 unique BST's.

   1         3     3      2      1
    \       /     /      / \      \
     3     2     1      1   3      2
    /     /       \                 \
   2     1         2                 3
  
*/



class Solution {
public:
    int numTrees(int n) {
        // instead we can use an iterative way other than this recursive way
        // same as computing fibonacci number
        if( n == 0 || n==1 )
            return 1;
        if( n == 2 )
            return 2;
        int sum = 0;
        
        for( int pos = 1; pos <= n ;pos++){
            sum += numTrees( pos -1 )* numTrees( n - pos );
        }
        return sum;
    }
};

void main(){
  Solution test;
  test.numTrees(5);
}
