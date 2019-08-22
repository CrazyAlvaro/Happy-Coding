class Solution {
public:
    void Addone( ListNode* temp, ListNode* l, int addition){
        if(addition==0){
            temp->next=l->next;
            return;
        }
        else if (l->next==NULL){
            ListNode* newNode=new ListNode(1);
            temp->next=newNode;
            return;
        }
        else{ // l->next !=NULL, and addition =1
            temp->next=l->next;
            while(addition>0)
            {
                if(l->next==NULL){
                    ListNode* newNode=new ListNode(1);
                    l->next=newNode;
                    return;
                }
                else{
                    l=l->next;
                    addition=(l->val+1)/10;
                    l->val=(l->val+1)%10;
                }
            }
            return;
        }
    }
    ListNode *addTwoNumbers(ListNode *l1, ListNode *l2) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(l1==NULL)
            return l2;
        else if (l2==NULL)
            return l1;
        else
            ;
        
        ListNode* head=new ListNode(0);
        int addition=0;
        ListNode *temp=head;
        
        while(true){
            temp->val=(l1->val +l2->val+addition)%10;
            addition=(l1->val+l2->val+addition)/10;
            
            if(l1->next==NULL){
                Addone(temp, l2, addition);
                return head;
            } 
            else if(l2->next==NULL){
                Addone(temp,l1, addition);
                return head;
            }
            else{ // neither l1->next nor l2->next == NULL
                ListNode* nextNode=new ListNode(0);
                temp->next=nextNode;
                temp=temp->next;
                l1=l1->next;
                l2=l2->next;
            }
        }
    }
};
