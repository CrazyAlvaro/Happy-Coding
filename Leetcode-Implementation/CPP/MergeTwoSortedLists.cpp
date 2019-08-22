/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ListNode * head, * temp;
        
        if( l1 == NULL )
            return l2;  // l2 may be NULL
        if( l2 == NULL )
            return l1;
         
        // Set the head and forward node
        if( l1->val <= l2->val){
            head=l1;
            l1=l1->next;
        }  
        else{
            head=l2;
            l2=l2->next;
        }
        
        temp=head;
              
        while( l1!=NULL && l2 !=NULL){
            if( l1->val <= l2-> val ){
                temp->next=l1;
                l1=l1->next;
            }
            else{
                temp->next=l2;
                l2=l2->next;
            }
            
            temp=temp->next;
        }
        
        if( l1!=NULL )
            temp->next=l1;
        else        // l2!=NULL 
            temp->next=l2;
            
        return head;
    }
};
