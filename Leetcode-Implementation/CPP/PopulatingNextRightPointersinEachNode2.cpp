/*
Follow up for problem "Populating Next Right Pointers in Each Node".

What if the given tree could be any binary tree? Would your previous solution still work?

Note:

    You may only use constant extra space.

For example,
Given the following binary tree,

         1
       /  \
      2    3
     / \    \
    4   5    7

After calling your function, the tree should look like:

         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \    \
    4-> 5 -> 7 -> NULL
*/

/**
 * Definition for binary tree with next pointer.
 * struct TreeLinkNode {
 *  int val;
 *  TreeLinkNode *left, *right, *next;
 *  TreeLinkNode(int x) : val(x), left(NULL), right(NULL), next(NULL) {}
 * };
 */
class Solution {
public:
    void connect(TreeLinkNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        TreeLinkNode* leftMost;     // the left most node of each level
        TreeLinkNode* prev;
        TreeLinkNode* curr;
        
        leftMost = root;
        
        while( leftMost != NULL ){
            curr = leftMost; // it node for the current level
            leftMost = NULL;
            prev = NULL;
            LevelTraverse( curr, leftMost, prev );
        }
    }
    
    void LevelTraverse( TreeLinkNode * &curr, TreeLinkNode* &left, TreeLinkNode* &prev){
        while( curr != NULL ){
            if( ! left )    
                left = curr-> left ? curr->left : curr->right;
            if( curr -> left  ){
                if( prev )  
                    prev -> next = curr -> left;
                prev = curr-> left;
            }
            
            if( curr -> right  ){             
                if( prev )  
                    prev -> next = curr -> right;
                prev = curr -> right;
            }
            curr = curr -> next;
        }
    }
};
