class Solution {
public:
    // check if two node are the same: their value and children's existing
    bool isSameNode(TreeNode *fi, TreeNode* se){
        if( fi->val != se->val)
            return false;
        if(    ((fi->left !=NULL) && (se->left ==NULL))
            || ((fi->left ==NULL) && (se->left !=NULL))
            || ((fi->right!=NULL) && (se->right==NULL))
            || ((fi->right==NULL) && (se->right!=NULL)) )
            return false;
        // same value, and same children's existing
        return true;
    }
    
    bool isSameVectorNodes( const vector<TreeNode*> &fi, const vector<TreeNode*> &se ){
        if( fi.size() != se.size() )
            return false;
        for( int i=0; i<fi.size(); i++){
            if( !isSameNode( fi[i], se[i]) )
                return false;
        }
        
        return true;
    }
    
    // get a vector of TreeNodes, get the child nodes from the same vector
    void getChildNodes( vector<TreeNode*> &pa){
        vector<TreeNode*> newNodes;
        for( int i=0; i<pa.size(); i++){
            if(pa[i]->left!=NULL)
                newNodes.push_back(pa[i]->left);
            if(pa[i]->right!=NULL)
                newNodes.push_back(pa[i]->right);
        }
        
        pa=newNodes;
		newNodes.clear();
    }
    
    bool isSameTree(TreeNode *p, TreeNode *q) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
		// check NULL pointer
		if(p==NULL && q== NULL)
            return true;
        else if( p==NULL || q==NULL )
            return false;
        else
            ;
        vector<TreeNode*> firstTree;
        vector<TreeNode*> secondTree;
        firstTree.push_back(p);
        secondTree.push_back(q);
        
        while( true ){
            if( !isSameVectorNodes(firstTree, secondTree) ){
                return false;
            }
            // until there is no child node
            if( firstTree.size()==0)
                return true;
            else{
                getChildNodes(firstTree);
                getChildNodes(secondTree);
            }
        }
        
    }
};
