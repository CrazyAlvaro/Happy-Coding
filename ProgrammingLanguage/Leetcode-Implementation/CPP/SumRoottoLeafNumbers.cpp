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
    int sum;
    int sumNumbers(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        int  num = 0;
        sum = 0;
        
        if( root == NULL )
            return sum;
            
        traversal( root, num);
        return sum;
    }
    
    void traversal( TreeNode * &node, int & num){
        if( node == NULL )
            return ;
            
        num *=10; 
        num += node->val;
        
        if( node-> left == NULL && node -> right == NULL){  // to leaf
            sum += num;
            num /= 10; // clear last digit 
            return ;
        }
        
        traversal( node-> left, num);
        traversal( node-> right, num);
        num /= 10; // clear last digit
    }
};
