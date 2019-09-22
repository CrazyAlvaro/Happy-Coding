//Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.
//For example:
//Given the below binary tree and sum = 22,

//              5
//             / \
//            4   8
//           /   / \
//          11  13  4
//         /  \    / \
//        7    2  5   1

//return

//[
//   [5,4,11,2],
//   [5,8,4,5]
//]



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
    void PreOrderTrav ( TreeNode* node, int &prevSum, const int &sum, vector<int> &path, vector< vector<int> > &ret ){
        if( node == NULL )
            return ;
        prevSum += node->val;
        path.push_back(node->val);
        
        if( node->left == NULL && node-> right ==NULL && prevSum == sum) // only check leaf
                ret.push_back(path);
            
        PreOrderTrav( node->left, prevSum, sum, path, ret);
        PreOrderTrav( node->right, prevSum, sum, path, ret);
        
        prevSum -= node->val;
        if( ! path.empty() )
            path.pop_back();
    }
    
    vector<vector<int> > pathSum(TreeNode *root, int sum) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector< vector<int> > result;
        int prevSum=0;
        vector<int> path;
        PreOrderTrav( root, prevSum, sum,  path,  result);
        return result;
    }
};
