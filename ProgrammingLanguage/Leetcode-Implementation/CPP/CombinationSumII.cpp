//Given a collection of candidate numbers (C) and a target number (T), find all unique combinations in C where the candidate numbers sums to T.
//Each number in C may only be used once in the combination.
//Note:

//    All numbers (including target) will be positive integers.
//    Elements in a combination (a1, a2, � , ak) must be in non-descending order. (ie, a1 ? a2 ? � ? ak).
//    The solution set must not contain duplicate combinations.

//For example, given candidate set 10,1,2,7,6,1,5 and target 8,
//A solution set is:
//[1, 7]
//[1, 2, 5]
//[2, 6]
//[1, 1, 6] 



class Solution {
public:
    vector<vector<int>> ret;
    vector<vector<int> > combinationSum2(vector<int> &num, int target) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ret.clear();
        if( num.size() == 0 )
            return ret;
        
        vector<int> temp;
        sort( num.begin(), num.end() );
        combiSum2Help( num, target, 0, temp);
             
        // before return ret, check for duplications
        checkDup( ret );
        return ret;
    }
    
    void checkDup( vector<vector<int>> &ret ){
      if( ret.size() == 0 )
			return;
		vector<vector<int>> temp;
		temp.push_back( ret[0] );
		
        for( auto it = ret.begin() + 1 ; it != ret.end(); it ++){
			bool dup = false;
			for( auto it2 = temp.begin(); it2 != temp.end(); it2 ++ ){
				if( checkVector( *it, *it2 ) ){
					dup = true;
					break; // break from current loop
				}	
			}
			if( !dup )
				temp.push_back( *it );
		}

		ret = temp;
		temp.clear();
    }
    
    bool checkVector( vector<int> &lt, vector<int> &rt){
        if( lt.size() != rt.size() )
            return false;
        
        if( lt.size() == 0 )
            return true;
        
        for( int i = 0; i < lt.size(); i ++ ){
            if( lt[i] != rt[i] )
                return false;
        }
        
        return true;
    }
    
    void combiSum2Help( const vector<int> &num, int target, int position, vector<int> &temp){
        if( target == 0 ){
            ret.push_back( temp );
            return ;
        }
        if( position >= num.size() || num[position] > target )
            return ;
            
        combiSum2Help( num, target, position + 1, temp );
        temp.push_back( num[position] );
        combiSum2Help( num, target - num[position], position + 1, temp );
        temp.pop_back();
    }
};
