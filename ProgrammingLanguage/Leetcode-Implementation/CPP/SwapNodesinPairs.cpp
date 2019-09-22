class Solution {
public:
    ListNode* SwapNextPair( ListNode*prev, ListNode* curr){
        if(curr==NULL)
            return curr;
        else if( curr->next ==NULL)
            return curr;
        
        ListNode* next=curr->next;
        if(prev==NULL){

            next=curr->next;
            curr->next=next->next;
            next->next=curr;
            SwapNextPair( curr, curr->next);
        }
        else{
            prev->next=next;
            curr->next=next->next;
            next->next=curr;
            SwapNextPair( curr, curr->next);
        }
        return next;

    }
    ListNode *swapPairs(ListNode *head) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        head=SwapNextPair(NULL, head);
        return head;
    }
};
