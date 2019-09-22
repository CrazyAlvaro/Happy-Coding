/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    vector<vector<int> > levelOrderBottom(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<vector<int>> result;
        
        vector<TreeNode*> queue;
        queue.push_back( root );
        levelBottomHelp( queue, result);
        if( result.size() != 0 )
            reverse(result.begin(), result.end() );
        return result;
    }
    
    void levelBottomHelp(vector<TreeNode*> &queue, vector<vector<int>> &result){
        vector<TreeNode*> tempNodes;
        vector<int> values;
        for( int i=0; i<queue.size(); i++){
            if( queue[i] != NULL ){
                values.push_back( queue[i]->val );
                tempNodes.push_back( queue[i]->left );
                tempNodes.push_back( queue[i]->right);
            }
        }
        if( values.size() != 0 )
            result.push_back( values );
            
        values.clear();
        queue.clear();
        
        if( tempNodes.size() != 0 )
            levelBottomHelp( tempNodes, result);
    }
};

void main(){
  Solution test;
  vector<vector<int>> res;
  TreeNode* root;
  res = test.levelOrderBottom(root);
}
