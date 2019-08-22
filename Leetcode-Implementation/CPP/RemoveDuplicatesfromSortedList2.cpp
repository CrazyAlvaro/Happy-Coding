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
    ListNode* DeleteMultiNodes(ListNode* prev, ListNode* front, ListNode* back){
        if(prev==NULL)// front is the first node
            return back->next;
        prev->next=back->next;
        return back->next;
    }
    
    ListNode *deleteDuplicates(ListNode *head) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(head==NULL)
            return NULL;
        if(head->next ==NULL)
            return head;
        ListNode* prev, *front, *back, *it;
        prev=NULL;
        front=head;
        it=head->next;
        bool duplicate=false;
        
        while(it!=NULL){
            if(it->val == front->val){
                back=it;
                it=it->next;
                duplicate=true;// set the flag to true
            }
            else{ // current value not equal to front's
                if(!duplicate){ // no duplicate nodes
                    // update all pointers
                    prev=front;
                    front=it;
                    it=it->next;
                }
                else{ // need to call delete
                    if(prev==NULL) // delete from the frist node
                        return deleteDuplicates(it);
                    else{
                        DeleteMultiNodes(prev,front,back);
                        return deleteDuplicates(head);
                    }
                }
                
            }
        }

    	if(duplicate){
			if(prev==NULL)
				return NULL;
			else
				prev->next=NULL;
		}
		return head;
    }
};
