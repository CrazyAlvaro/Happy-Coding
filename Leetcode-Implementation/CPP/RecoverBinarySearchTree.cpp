class Solution {
public:
    void SwapValue(TreeNode* a, TreeNode* b){
        int temp=a->val;
        a->val=b->val;
        b->val=temp;
    }
    
    void CheckNode(TreeNode*node, TreeNode* &prev, TreeNode *&a, TreeNode *&b){
        // only check if prev is wrong node
        if( prev->val > node->val){
            // two cases  :153426  5 2 
    		//			   213456  2 1 continues
            if(a==NULL){ // assume two continues mis
                a=prev;
				b=node;
			}
            else// a!=NULL
                b=node;
        }   
    }
    
    void LookForNodes( TreeNode* node, TreeNode * &a, TreeNode * &b, TreeNode* &prev){
        // In-Order traveral node
        
        // visiting left node
        if(node->left!=NULL)
            LookForNodes(node->left,a,b,prev);
            
        // visiting current node
        if( prev==NULL){
            prev=node;
        }
        else{
            CheckNode(node,prev,a,b);
            prev=node;
        }
        
		// can't do this because not sure two continues or not

        //if( a && b) // found two pointers
        //    return ;
        
        // visiting right node
        if(node->right!=NULL)
            LookForNodes(node->right,a,b,prev);
        
    }
    
    void recoverTree(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( root==NULL)
            return ;
        
        // Two pointer to store two misNode
        TreeNode *a, *b, *prev;
        a=NULL;
        b=NULL;
        prev=NULL;
        
        //while( !a || !b ){ // after two pointer found, stop loop
            // In order  taversal
        //}
        LookForNodes(root,a,b,prev);
        
        // swap a b value
        if( a && b)
            SwapValue(a,b);
    }
};


// Revised Solution:
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
    void SwapValue(TreeNode* a, TreeNode* b){
        int temp=a->val;
        a->val=b->val;
        b->val=temp;
    }
    

    
    void LookForNodes( TreeNode* node, TreeNode * &a, TreeNode * &b, TreeNode* &prev){
        // In-Order traveral node
        if(node==NULL)
            return;
        // visiting left node
        LookForNodes(node->left,a,b,prev);
            
        // visiting current node
        if( prev!=NULL && (prev->val > node->val) ){
            if(a==NULL)
                a=prev;
            b=node;
        }
        prev=node;
        
        // visiting right node
        LookForNodes(node->right,a,b,prev); 
    }
    
    void recoverTree(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( root==NULL)
            return ;
        
        // Two pointer to store two misNode
        TreeNode *a, *b, *prev;
        a=NULL;
        b=NULL;
        prev=NULL;
        
        //while( !a || !b ){ // after two pointer found, stop loop
            // In order  taversal
        //}
        LookForNodes(root,a,b,prev);
        
        // swap a b value
        if( a && b)
            SwapValue(a,b);
    }
};
