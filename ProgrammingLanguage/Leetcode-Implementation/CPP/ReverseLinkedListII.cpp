/*  
  Reverse a linked list from position m to n. Do it in-place and in one-pass.
  
  For example:
  Given 1->2->3->4->5->NULL, m = 2 and n = 4,
  
  return 1->4->3->2->5->NULL.
  
  Note:
  Given m, n satisfy the following condition:
  1 ? m ? n ? length of list.
*/


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
    ListNode *reverseBetween(ListNode *head, int m, int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( m >= n || m <=0 )
            return head;
            
        int size=0;
        ListNode* temp=head;
        for(  ; temp != NULL; temp=temp->next , size ++ ); 
        if( size < n )
            return head;
        
        temp = head;
        ListNode* prev = NULL;
        int times = n - m;
        
        if( m == 1 )
            head = reverseList( prev, temp, times);
        else{
            for( ; (m--) > 1; prev = temp, temp = temp->next ) ;
            temp = reverseList( prev, temp, times );
        }
        return head;
    }
    
    ListNode* reverseList( ListNode* prev, ListNode* head,int times ){
        
        ListNode* temp = head;
        vector< ListNode* > nodes;
        for( int i=0; i<=times; i++){
            nodes.push_back( temp );
            temp = temp -> next;
        }
        
        nodes[0]->next = nodes[ times ] -> next;
        for( int i =times; i >0; i-- ){
            nodes[i]->next = nodes[i-1];
        }
        
        if( prev == NULL)
            return nodes[times];
        
        prev ->next = nodes[times];
        
        return nodes[times - 1];
        
    }
};
