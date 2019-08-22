// In order traversal 

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
    bool CheckSorted(vector<int> &vnumber){
        bool sorted=true;
        if(vnumber.size() <=1)
            return sorted;
        
        int prev=vnumber[0];
        for( int i=1; i<vnumber.size(); i++){
            if(prev>=vnumber[i])
                return !sorted;
            prev=vnumber[i];
        }
        return sorted;
    }
    
    void InOrderTraverse( TreeNode* node, vector<int> & vnum){
        if( node->left !=NULL)
            InOrderTraverse(node->left, vnum);
        // visit node
        vnum.push_back(node->val);
        
        if( node->right!=NULL)
            InOrderTraverse(node->right,vnum);
    }
    
    bool isValidBST(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( root==NULL)
            return true;
        vector<int> result_num;
        InOrderTraverse(root,result_num);
        bool validBST=CheckSorted(result_num);
        return validBST;
        
    }

};
