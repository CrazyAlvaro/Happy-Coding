class Solution {
public:
    bool isChildrenSym(TreeNode* le, TreeNode* ri){
        if((le->left ==NULL && ri->right!=NULL)
        || (le->left !=NULL && ri->right==NULL)
        || (le->right==NULL && ri->left!=NULL)
        || (le->right!=NULL && ri->left==NULL) )
            return false;
        else
            return true;
    }
    
    bool isSym( vector<TreeNode*> nodes){
        // nodes number>1 and is even
        if(nodes.size()==0)
            return true;
            
        int size=nodes.size()-1;
        
        // check nodes value and children nodes existing symmatric
        for( int i=0; i<=size/2; i++){
            if( nodes[i]->val != nodes[size-i]->val)
                return false;
            if( ! isChildrenSym(nodes[i], nodes[size-i]) )
                return false;
        }
        
        vector<TreeNode*> nextNodes;
        // put all the child noeds into a new vector
        for( int i=0; i<=size; i++){
            if( nodes[i]->left!=NULL )
                nextNodes.push_back( nodes[i]->left);
            if(  nodes[i]->right!=NULL)
                nextNodes.push_back(  nodes[i]->right);
        }
            
        // recursively call isSym function
        return isSym( nextNodes);
        
    }
    
    //bool isRootSym(TreeNode* node){
    //    
    //}
    
    bool isSymmetric(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if(root==NULL)
            return true;
        
        vector<TreeNode*> nodes;
        if( root->left!=NULL && root->right!=NULL){
            nodes.push_back(root->left);
            nodes.push_back(root->right);
            return isSym(nodes);
        }
        else if( root->left==NULL && root->right==NULL)
            return true;
        else
            return false;
    }
};
