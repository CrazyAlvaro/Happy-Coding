/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class LowestCommonAncestor {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        List<TreeNode> firstPath = nodePath(root, p);
        List<TreeNode> secondPath = nodePath(root, q);

        TreeNode commonAncestor;
        int size = Math.smaller(firstPath.size(), secondPath.size());

        for(int i = 0; i < size; i++) {
            if(firstPath.at(i) != secondPath.at(i)) {
                commonAncestor = firstPath.at(i-1);
            } else {
                commonAncestor = firstPath.at(i);
            }
        }

        return commonAncestor;
    }

    /**
     * Use DFS to find the path from root to node
     */
    public List<TreeNode> nodePath(TreeNode root, TreeNode node) {


    }

    public void dfs(TreeNode node, TreeNode target) {
        if(node == target) {
            if(firstPath != null) {
                firstPath = nodePath;
            } else {
                secondPath = nodePath;
            }
        } else {
            nodePath.push(node);
            dfs(node.left
    }
}
