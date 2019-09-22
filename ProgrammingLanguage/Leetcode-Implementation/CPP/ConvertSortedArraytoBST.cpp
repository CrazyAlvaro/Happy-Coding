/**
 * Definition for binary tree
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode *sortedArrayToBST(vector<int> &num) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        TreeNode* head;
        //if( num.size() == 0 ) return head;
        head = sortedArrToBSTHelp( num, 0, num.size() -1 );
        return head;  
    }
    
    TreeNode * sortedArrToBSTHelp( vector<int> &num, int start, int end){
        if( start == end ){
            TreeNode* node= new TreeNode(num[start] );
            return node;
        }
        if( start > end )
            return NULL;
        
        int mid = (start + end)/2;
        TreeNode* node = new TreeNode( num[mid] );
        node -> left =sortedArrToBSTHelp( num, start, mid - 1);
        node -> right=sortedArrToBSTHelp( num, mid + 1, end);
    }
};

void main(int argc, char* argv[]){
  Solution test;
  vector<int> test_v;
  test.sortedArrayToBST(test_v);
}
