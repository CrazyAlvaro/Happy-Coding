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
    void BinaryTreeToLinkedList( TreeNode* &node, TreeNode* &nextNode){
        // Reverse PostOrderTraversal
        if( node == NULL )
            return ;
            
        BinaryTreeToLinkedList( node->right, nextNode);
        BinaryTreeToLinkedList( node->left, nextNode);
        
        if( nextNode != NULL )
            node->right = nextNode;
            
        node->left = NULL;
        nextNode = node;
    }
    
    void flatten(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
    	TreeNode *nextNode;
        nextNode=NULL;
        BinaryTreeToLinkedList( root, nextNode);
    }
};
