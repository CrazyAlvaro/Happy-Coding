/*
Given a collection of integers that might contain duplicates, S, return all possible subsets.

Note:

Elements in a subset must be in non-descending order.
The solution set must not contain duplicate subsets.
For example,
If S = [1,2,2], a solution is:

[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
*/

class Solution {
public:
    vector<vector<int> > subsetsWithDup(vector<int> &S) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        vector<vector<int>> res;
        if( S.size() == 0 )
            return res;
            
        vector<int> path;
        // sort the vector, use recursive way to compute subsets
        sort(S.begin(), S.end());
        subSetsDup(0, S, path, res );
        return res;
    }
    
    void subSetsDup(int start, vector<int> &sets, vector<int> &path, vector<vector<int>> &res ){
        res.push_back( path );
        
        for( int i = start; i < sets.size(); i++){
            // to avoid duplications
            if( i != start && sets[i] == sets[i-1] )
                continue;
                
            path.push_back(sets[i]);
            subSetsDup( i+1, sets, path, res);
            path.pop_back();
        }
    }
};

void main(){
  Solution test;
  vector<int> sets;
  test.subsetsWithDup(sets); 
}
