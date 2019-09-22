/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
  public boolean isSymmetric(TreeNode root) {
    if(root == null) {
      return true;
    }
    else {
      return isNodesSymmetric(root.left, root.right);
    }
  }

  public boolean isNodesSymmetric(TreeNode first, TreeNode second) {
    if(first == null && second == null) {
      return true;
    }
    else if(first != null && second != null && first.val == second.val) {
      return isNodesSymmetric(first.left, second.right) && isNodesSymmetric(first.right, second.left);
    }
    else {
      return false;
    }
  }
}
