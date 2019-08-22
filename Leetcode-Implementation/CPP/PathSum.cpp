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
    void preOrderTrav(TreeNode* node, const int &sum, int &prevSum, bool &ret){
        if(node==NULL)
            return ;
        if( ret ==true )
            return ;
        
        prevSum += node->val; 
        if( node-> left == NULL && node -> right ==NULL && prevSum == sum){
            ret=true;
            return ;
        }
        
        preOrderTrav(node->left, sum, prevSum, ret);
        preOrderTrav(node->right, sum, prevSum, ret);
        
        prevSum -= node->val;
    }
    
    bool hasPathSum(TreeNode *root, int sum) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        bool result=false;
        int prevSum=0;
        if( root == NULL )
            return result;
        //if( root -> val == sum )
        //    return !result;
            
        preOrderTrav(root, sum, prevSum, result);
        return result;
    }
};
