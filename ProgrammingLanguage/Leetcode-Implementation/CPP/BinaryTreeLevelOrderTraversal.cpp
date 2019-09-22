class Solution {
public:
    vector<vector<int> > levelOrder(TreeNode *root) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        vector<vector<int>> result;
        if(root==NULL)
            return result;
            
        vector<TreeNode*> levelNodes;
        vector<TreeNode*> tempNodes;
        vector<int> level;
        levelNodes.push_back(root);
        
        while( levelNodes.size() !=0){
            for( auto it=std::begin(levelNodes); it!=std::end(levelNodes); it++){
                level.push_back((*it)->val);
                if((*it)->left!=NULL)
                    tempNodes.push_back((*it)->left);
                if((*it)->right!=NULL)
                    tempNodes.push_back((*it)->right);
            }
            levelNodes=tempNodes;
            result.push_back(level);
            tempNodes.clear();
            level.clear();
        }
        return result;
    }
};
