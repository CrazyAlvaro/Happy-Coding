//Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

//For example,
//Given [100, 4, 200, 1, 3, 2],
//The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.
//Your algorithm should run in O(n) complexity.


class Solution {
public:
    int longestConsecutive(vector<int> &num) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        unordered_map<int, int> hashmap;
        for( int i=0; i<num.size(); i++)
            hashmap[ num[i] ] = 1;
            
        int ans=1;
        
        for( int i=0; i<num.size(); i++){
            int temp = num[i] + 1;
            auto it = hashmap.find( temp );
            while( it != hashmap.end() ){
                hashmap[ num[i] ] += it->second;
                hashmap.erase(it);
                it = hashmap.find( ++ temp );
            }
            
            ans = max( ans, hashmap[ num[i] ] );
        }
        return ans;    
    }
};
