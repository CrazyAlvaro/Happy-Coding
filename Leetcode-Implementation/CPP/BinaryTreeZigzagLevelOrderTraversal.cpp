class Solution {
public:
    vector<vector<int> > zigzagLevelOrder(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector< vector<int> > result;
        if(root==NULL)
            return result;
        
        bool reverse=false;
        vector<int> level;
        vector<TreeNode*> level_nodes;
        vector<TreeNode*> tempNodes;
        level_nodes.push_back(root);
        
        while( level_nodes.size() !=0){
            if(reverse){
                for( int it=level_nodes.size()-1; it>=0; it--){
                    level.push_back( level_nodes[it]->val);
                    if(level_nodes[it]->right!=NULL)
                        tempNodes.push_back( level_nodes[it]->right );
                    if(level_nodes[it]->left!=NULL)
                        tempNodes.push_back( level_nodes[it]->left);
                }
            }
            else{ // not reverse
                for( int it=level_nodes.size()-1; it>=0; it--){
                    level.push_back( level_nodes[it]->val);
                    if(level_nodes[it]->left!=NULL)
                        tempNodes.push_back(level_nodes[it]->left);
                    if(level_nodes[it]->right!=NULL)
                        tempNodes.push_back(level_nodes[it]->right);
                }
            }
            result.push_back(level);
            level_nodes=tempNodes;
            tempNodes.clear();
            level.clear();
            reverse= (!reverse);
        }
        
        return result;        
    }
};
