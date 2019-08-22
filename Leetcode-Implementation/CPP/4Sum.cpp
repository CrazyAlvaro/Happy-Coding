/*

Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? Find all unique quadruplets in the array which gives the sum of target.

Note:

Elements in a quadruplet (a,b,c,d) must be in non-descending order. (ie, a ? b ? c ? d)
The solution set must not contain duplicate quadruplets.
    For example, given array S = {1 0 -1 0 -2 2}, and target = 0.

    A solution set is:
    (-1,  0, 0, 1)
    (-2, -1, 1, 2)
    (-2,  0, 0, 2)
    
*/

#include <vector>
#include <algorithm>

using namespace std;

class Solution {
public:
    void IncreaseIterator(vector<int> &num, int &itor){
        do{
            itor++;
        }
        while( num[itor] == num[itor-1] );
    }
    
    void DecreaseIterator( vector<int> &num, int &itor){
        do{
            itor--;
        }
        while( num[itor] == num[itor+1]);
    }
    vector<vector<int> > fourSum(vector<int> &num, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<vector<int>> ret;
        vector<int> solution;
        
        sort( num.begin(), num.end() );
        int size = num.size();
        if( size < 4 )  return ret;
        
        for( int i = 0; i < size -3; i++){
            // avoid duplication
            if( i!=0 && num[i] == num[i-1] )
                continue;
                
            for( int j = i+1; j < size-2; j++){
                // avoid duplication
                if( j!= i+1 && num[j] == num[j-1] )
                    continue;
                    
                int left = j+1, right = size-1;
                while( left < right ){
                    int sum = num[i] + num[j] + num[left] + num[right];
                    if( sum < target ){
                        IncreaseIterator( num, left );
                    }
                    else if( sum > target ){
                        DecreaseIterator( num, right);
                    }
                    else{
                        solution.push_back( num[i] );
                        solution.push_back( num[j] );
                        solution.push_back( num[left] );
                        solution.push_back( num[right] );
                        ret.push_back( solution );
                        solution.clear();
                        IncreaseIterator(num, left);
                        DecreaseIterator(num, right);
                    }
                }
            }
        }   
  	return ret;
    }
};

void main(){
	Solution test;
	vector<int> set;
	set.push_back(-1);
	set.push_back(-2);
	set.push_back(0);
	set.push_back(0);
	set.push_back(1);
	set.push_back(2);
	test.fourSum(set,0);
}
