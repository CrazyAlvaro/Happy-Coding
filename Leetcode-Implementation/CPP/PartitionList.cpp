class Solution {
public:
    ListNode* Insert(ListNode* former, ListNode* insertNode){
        if(former==NULL)
            return insertNode;
        ListNode* formerNext=former->next;
        former->next=insertNode;
        insertNode->next=formerNext;
        return insertNode;
    }
    
    ListNode* DeleteNode( ListNode* prev, ListNode* deleteNode){
        ListNode* nextNode=deleteNode->next;
        if( prev==NULL) { // deleteNode will be the new head
            return deleteNode;
        }
        prev->next=nextNode;
        deleteNode->next=NULL;
        return deleteNode;
    }
    ListNode *partition(ListNode *head, int x) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        ListNode* n_it=head, *prevLess=NULL, *prev=NULL, *temp; // when first node >= x
        while(n_it!=NULL){            
            if( n_it->val>=x){
                prev=n_it;
                n_it=n_it->next;
            }
            else{                   // prev won't change
                temp=n_it;          // point to the current node
                n_it=n_it->next;    // iterator to the next node
                DeleteNode(prev,temp);
                if(prev==NULL){ // this node is the first node
                    prevLess=temp;
                    continue;
                }
                else if(prevLess==NULL){
                    temp->next=head;
                    head=temp;
                    prevLess=head;
                }
                else
                    prevLess=Insert(prevLess,temp);
                          
            }        
        }
        return head;
    }       
};
