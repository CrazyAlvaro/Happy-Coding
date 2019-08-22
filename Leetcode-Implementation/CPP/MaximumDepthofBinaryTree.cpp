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
    int Depth( vector<TreeNode*> nodes, int height){
        vector<TreeNode*> newNodes;
    	for(auto _it=std::begin(nodes); _it!=end(nodes); _it++){
		//for(vector<TreeNode*>::iterator _it=nodes.begin(); _it!=nodes.end(); _it++){
            if( (*_it)->left!=NULL)
                newNodes.push_back( (*_it)->left);
            if(  (*_it)->right!=NULL)
                newNodes.push_back(  (*_it)->right);
        }
        
        if( newNodes.size() == 0)
            return height;
        else
            return Depth(newNodes, ++height);
    }
    
    int maxDepth(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        
        if(root!=NULL){
            vector<TreeNode*> nodes;
            nodes.push_back(root);
            return Depth(nodes,1);
        }
        else
            return 0;
    }
};
