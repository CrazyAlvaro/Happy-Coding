/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
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
    TreeNode *sortedListToBST(ListNode *head) {
        // inorder traversal construct a BST to sorted linked list
        // we are doing the construction in opposite way
        ListNode* node = head;
        int size = 0;
        for( ; node != NULL; size++, node = node->next ) ;
        return sortedListToBSTHelp( head, 0, size-1);
    }
    
    TreeNode *sortedListToBSTHelp(ListNode* &head, int start, int end ){
        if( start > end )   return NULL;
        
        int mid = (start + end ) /2;
        TreeNode* leftChild = sortedListToBSTHelp( head, start, mid-1);
        
         // this head is a global variable since we get it by reference
        TreeNode* parent =new TreeNode( head->val );   
        head= head->next; 
        
        parent->left = leftChild;
        parent->right = sortedListToBSTHelp( head, mid+1, end);
        
        return parent;
    }
};


void main(){
  Soluction test;
  ListNode* head;
  test.sortedListToBST(head);
}
