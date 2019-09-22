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
    void PathSum( TreeNode* node, int & sum, int &csum){
        if( !node ){
            csum=0;
            return ;
        }
        
        int lsum;
        int rsum;
        PathSum( node->left, sum, lsum);
        PathSum( node->right, sum, rsum);
        
        // csum is somthing can be extended 
        csum = max ( node->val, max ( node->val + lsum, node->val + rsum ) );
        
        // since node->val + lsum + rsum will be own ended path, it shoudl not be
        // counted as csum for further computing
        sum = max( sum, max ( csum, node->val + lsum + rsum ) );
    }
    int maxPathSum(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int ret=INT_MIN;
        int csum;
        
        PathSum( root, ret, csum );
        return ret;  
    }
};
