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
    ListNode *rotateRight(ListNode *head, int k) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( head==NULL || k==0 )
            return head;
            
        int size=0;
        ListNode* temp=head;
        ListNode* tail;
        
        for( ; temp!=NULL; tail=temp, temp=temp->next, size++) ;
        
        k %=size;
        if( k == 0 )
            return head;
            
        ListNode* prev;
        temp=head;
        prev=temp;
        for( int i=0; i< (size-k); i++){
            prev=temp;
            temp=temp->next;
        }
        
        prev->next=NULL;
        tail->next=head;
        head=temp;
        return head;
    }
};
