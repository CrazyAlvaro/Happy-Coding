Solution: according to the character or preorder and inorder ninary tree, divide into three parts

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
    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( preorder.size() == 0)
			return NULL;
		TreeNode* root=new TreeNode(preorder[0]); // the root
        
        	int pos;
		pos=GetInorderPos(preorder[0],inorder, 0, inorder.size());

		root->left=ConstrSubTree(preorder, inorder, 0+1, 0+pos-0, 0, 0+pos-1 );
		root->right=ConstrSubTree( preorder, inorder,pos+1,preorder.size()-1, pos+1,inorder.size()-1 );
		return root;
        
    }

	int GetInorderPos( int root, vector<int> &inorder,int start, int end){
		int pos=-1;
		for(int i=start; i<=end; i++){
			if(root==inorder[i]){
				pos=i;
				break;
			}
		}
		return pos;	
	}


	TreeNode* ConstrSubTree( vector<int> &preorder, vector<int> &inorder,int preStart, int preEnd, int inStart, int inEnd){ 
    	if(preStart>preEnd || inStart>inEnd)
			return NULL;

		TreeNode* subRoot=new TreeNode( preorder[preStart]);
		int pos;
		pos=GetInorderPos(preorder[preStart],inorder, inStart, inEnd);

		subRoot->left=ConstrSubTree(preorder, inorder, preStart+1, preStart+pos-inStart, inStart, pos-1 );
		subRoot->right=ConstrSubTree(preorder, inorder, preStart+pos-inStart+1, preEnd, pos+1, inEnd);
	
		return subRoot;
	}
};




// Memory too large, using recursive

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
    TreeNode *buildTree(vector<int> &preorder, vector<int> &inorder) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
    	if(preorder.size() != inorder.size())
			return NULL;
		if( preorder.size() == 0)
			return NULL;
		TreeNode* root=new TreeNode(preorder[0]); // the root

		int inorderPos=-1;
		inorderPos=GetInorderPos(preorder[0],inorder);
		if(inorderPos==-1)
			return NULL; // getting a fault

		vector<int> inorderLeft=ConstrVector(inorder,0,inorderPos-1);
		vector<int> inorderRight=ConstrVector(inorder,inorderPos+1, inorder.size()-1);

		vector<int> preorderLeft=ConstrVector(preorder, 1, inorderPos);
		vector<int> preorderRight=ConstrVector(preorder,inorderPos+1, preorder.size()-1);

		bool left=true;
		ConstrSubTree(root, preorderLeft, inorderLeft, left);
		ConstrSubTree(root, preorderRight, inorderRight, !left);
		return root;
        
    }

	int GetInorderPos( int root, vector<int> &inorder){
		int pos=-1;
		for(int i=0; i<inorder.size(); i++){
			if(root==inorder[i]){
				pos=i;
				break;
			}
		}
		return pos;
	
	}

	vector<int> ConstrVector(vector<int> origin_vector, int start, int end){
		vector<int> myVector;
		for( int i=start; i<=end; i++){
			myVector.push_back(origin_vector[i]);
		}
		return myVector;
	}

	bool ConstrSubTree(TreeNode* par, vector<int> &preorder, vector<int> &inorder, bool left){ 
		if(preorder.size()==0)
			return true;
		TreeNode* subRoot=new TreeNode( preorder[0]);
		if(left)
			par->left=subRoot;
		else
			par->right=subRoot;

		int inorderPos=-1;
		inorderPos=GetInorderPos(preorder[0],inorder);
		if(inorderPos==-1)
			return NULL; // getting a fault

		vector<int> inorderLeft=ConstrVector(inorder,0,inorderPos-1);
		vector<int> inorderRight=ConstrVector(inorder,inorderPos+1, inorder.size()-1);

		vector<int> preorderLeft=ConstrVector(preorder, 1, inorderPos);
		vector<int> preorderRight=ConstrVector(preorder,inorderPos+1, preorder.size()-1);

		ConstrSubTree(subRoot, preorderLeft, inorderLeft, true);
		ConstrSubTree(subRoot, preorderRight, inorderRight, false);
	
		return true;
	}
};
