/*

Given an array S of n integers, find three integers in S such that the sum is closest to a given number, target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

    For example, given array S = {-1 2 1 -4}, and target = 1.

    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
*/

class Solution {
public:
    int threeSumClosest(vector<int> &num, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int min = INT_MAX, sum, size = num.size();
        if( size < 3 )  return -1;    
        sort(num.begin(), num.end() );
        for( int i =0; i < size - 2; i ++ ){
            int left = i +1, right = size -1;
            
            while( left < right ){
                int temp_sum = num[i] + num[left] + num[right];
                int product = temp_sum - target;
                if( product < 0 ){
                    if( abs(product ) < min ){
                        min = abs( product );
                        sum = temp_sum;
                    }
                    left++;
                }
                else if( product > 0 ){
                    if( product< min ){
                        min = product;
                        sum = temp_sum;
                    }
                    right--;
                }
                else
                    return temp_sum;
            } 
        }
        return sum;
    }
};

int main(){
  Solution test;
  vector<int> num;
  int target;
  test.threeSumClosest(num, target);
}
