class Solution {
public:
    ListNode *deleteDuplicates(ListNode *head) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ListNode* prev, *it, *temp;
        if(!head)
            return head;
        prev=head;
        it=head->next;
        if(!it)
            return head;
        
        while( it) {
            if(prev->val == it->val){
                prev->next=it->next;
                temp=it;
                it=it->next;
                delete temp;
            }
            else{
                prev=it;
                it=it->next;
            }
        }
        return head; 
    }
};
