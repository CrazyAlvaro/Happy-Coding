class Solution {
public:
    TreeNode *buildTree(vector<int> &inorder, vector<int> &postorder) {
        // Start typing your C/C++ solution below
        // DO NOT write int main() function
        if( inorder.size() != postorder.size() )
            return NULL;
        
        TreeNode* root = buildTreeHelp( inorder, 0, inorder.size()-1, postorder, 0, postorder.size() -1 );
        return root;
    }
    
    TreeNode* buildTreeHelp( vector<int> &inorder,int ins,int ine, vector<int> &postorder, int posts, int poste ){
        if( ine - ins != poste-posts || ine- ins < 0 || poste- posts < 0 )
            return NULL;
        int value = postorder[ poste ];
        // inorder_pos is the position of value in inorder,
        // this position is also the beginning of the right subtree in postorder
        int inorder_pos = linearSearch( inorder, ins, ine, value );
        
        TreeNode* node= new TreeNode( value );
        
        if( inorder_pos == -1 ) return node;
        
  	// carefully with relative position
        node -> left = buildTreeHelp( inorder, ins, inorder_pos -1, postorder, posts, posts+(inorder_pos-ins)-1 );
        node -> right = buildTreeHelp( inorder, inorder_pos+1, ine, postorder, posts+(inorder_pos-ins), poste-1);
        
        return node;
    }

	int linearSearch(vector<int> &values,int &start, int &end, int &target ){
		for( int i = start; i<=end; i++ ){
    	    if( values[i] == target )
                return i;
		}
		return -1;
	}
    
    int BinarySearch( vector<int> & values, int &target ){
        int left = 0, right = values.size() -1;
        int mid;
        while( left <= right ){
            mid = ( left + right ) /2;
            if( values[mid] == target )
                return mid;
                
            if( values[mid] < target )
                left = mid + 1;
            else
                right = mid -1;
        }
        
        return -1;
    }
};
