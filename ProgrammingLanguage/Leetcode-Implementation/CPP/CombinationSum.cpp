//Given a set of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
//The same repeated number may be chosen from C unlimited number of times.
//Note:

//    All numbers (including target) will be positive integers.
//    Elements in a combination (a1, a2, � , ak) must be in non-descending order. (ie, a1 ? a2 ? � ? ak).
//    The solution set must not contain duplicate combinations.

//For example, given candidate set 2,3,6,7 and target 7,
//A solution set is:
//[7]
//[2, 2, 3] 



class Solution {
public:
    vector<vector<int>> ret;
    
    vector<vector<int> > combinationSum(vector<int> &candidates, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ret.clear();
        sort( candidates.begin(), candidates.end() );
        if( candidates.size() == 0)
            return ret;
        
        vector<int> temp;
        combiSumHelp( candidates, 0, target, temp );
        return ret;
    }
    
    void combiSumHelp( vector<int> &candidates,int start, int target, vector<int> &temp){
        // for  i*candidates[start], subtract from target
        if( target == 0 ){
            ret.push_back( temp );
            return ;
        }
        if( start >= candidates.size() || candidates[start] > target )
            return ;
        
        int i = 0;
        combiSumHelp( candidates, start + 1, target, temp );
        
        for( i = 1; i * candidates[start] <= target; i++){
            temp.push_back( candidates[start] );
            combiSumHelp( candidates, start + 1, target - i*candidates[start], temp );
        }
        
        // clean temp
        for( int j = 1; j < i; j ++){
            temp.pop_back();
        }
    }
};
