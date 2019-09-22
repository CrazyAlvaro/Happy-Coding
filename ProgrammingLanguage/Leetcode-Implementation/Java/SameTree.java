/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class SameTree {
  public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
  }

  // My solution
  public boolean isSameTree(TreeNode p, TreeNode q) {
    // Recursive way to check two nodex contains same value
    if(p == null && q == null) {
      return true;
    }
    else if(p != null && q != null && q.val == p.val) {
      return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
    else {
      return false;
    }
  }

  public static void main(String args[]) {
  }
}
