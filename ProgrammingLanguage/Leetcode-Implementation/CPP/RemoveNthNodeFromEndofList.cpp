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
    ListNode *removeNthFromEnd(ListNode *head, int n) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        std::map<int, ListNode*> nodemap;
        ListNode* itNode=head;
        int count=0;
        
        for( ; itNode!=NULL; count++, itNode=itNode->next)
            nodemap[count]=itNode;

        ListNode* p_deleteNode=nodemap.find(count-n)->second;
        
        if( p_deleteNode==head)
            head=head->next;
        else{
            ListNode* p_prevNode=nodemap.find(count-n-1)->second;
            p_prevNode->next=p_deleteNode->next;
        }
        
        return head;
    }

};
