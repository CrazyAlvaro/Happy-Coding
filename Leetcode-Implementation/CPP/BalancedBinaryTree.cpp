// Given a binary tree, determine if it is height-balanced.

// For this problem, a height-balanced binary tree is defined as a binary tree 
// in which the depth of the two subtrees of every node never differ by more than 1.




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
    bool balanced;
    bool isBalanced(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        balanced = true;
        int height = 0;
        InorderTraversal( root, height);
        return balanced;
    }
    
    void InorderTraversal( TreeNode * &node, int &height ){
        if( !node )
            return ;
            
        int left = 1, right = 1;
        InorderTraversal( node -> left, left );
        InorderTraversal( node -> right, right );
        if( abs( left - right ) > 1 )
            balanced = false;
        height = max( left, right ) + height;
    }
};
