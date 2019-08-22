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
    int BFS( vector<TreeNode*> & levelNodes, int depth){
        if(levelNodes.size()==0)
            return depth;
        vector<TreeNode*> nextLevNodes;
        for( int i=0; i<levelNodes.size(); i++){
            if( levelNodes[i]->right==NULL && levelNodes[i]->left==NULL)
                return depth;
            if( levelNodes[i]->right!=NULL)
                nextLevNodes.push_back(levelNodes[i]->right);
            if( levelNodes[i]->left!=NULL)
                nextLevNodes.push_back(levelNodes[i]->left);
        }
        return BFS(nextLevNodes, depth+1);
    }
    int minDepth(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        // My solution  using BFS 
        if(root==NULL)
            return 0;
        vector<TreeNode*> nodes;
        nodes.push_back(root);
        return BFS(nodes,1);
        
    }
};
