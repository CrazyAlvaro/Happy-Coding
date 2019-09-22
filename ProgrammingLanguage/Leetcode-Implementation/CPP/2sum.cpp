//Solution1: O(n*n)  naïve iterator over the vector to check each pair see if they match
class Solution {
public:
    vector<int> twoSum(vector<int> &numbers, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        vector<int> result(2, 0);
        for(int i = 0; i < numbers.size(); i++)
        {
            for( int j=i+1; j<numbers.size(); j++)
            {
                if(numbers[i] + numbers[j] == target)
        		{
					result[0] = i + 1;
					result[1] = j + 1;

				}
            }
        }   
        return result;
    }   
}; 

/*
Solution2:  Sort time + O(n)
Create a node to store both index and value. Sort the array by values, and check from both end to the middle to get the matched values, 
Then return both index

Solution3: O(n)
use a Hash Map to store all values, and for each element in the hash table, check if 
( target - value) exist, if it does, return both index  
*/
class Solution {
public:
    vector<int> twoSum(vector<int> &numbers, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<int> result(2,0);
        map<int,int> num_map;
        int temp_num; 
        
        for( int i=0; i<numbers.size(); i++)
        {
           temp_num=target-numbers[i];
           
           if( num_map[temp_num] > 0)
           {
               result[0]=num_map[temp_num];
               result[1]=i+1;
               i=numbers.size();
           }
           else
           {
               num_map[numbers[i]]=i+1;
           }
        }        
        return result;
    }

};
