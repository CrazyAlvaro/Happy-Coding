class Solution {
public:
    ListNode *mergeKLists(vector<ListNode *> &lists) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ListNode* head=NULL;
        if(lists.size() ==0)
            return head;
        Mergelist(lists, head);
        return head;
        
    }
    
    void Mergelist( vector<ListNode*> &lists, ListNode* &lastnode){
        int min=-1, val=INT_MAX;
        for( int i=0; i<lists.size(); i++){
            if( lists[i] ==NULL )
                continue;
            if( lists[i]->val <val){
                val=lists[i]->val;
                min=i;
            }
        }
        
        if( min==-1 )
            return ;
        if( lastnode ==NULL ){
            lastnode=lists[min];
            lists[min]=lists[min]->next;
            Mergelist(lists,lastnode);
        }
        else{
            lastnode->next=lists[min];  
            lists[min]=lists[min]->next;
            Mergelist(lists,lastnode->next);
        }
        
    }
};
