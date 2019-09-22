import java.util.*;
/**
 * Definition for binary tree
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

public class BSTIterator {
  public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
  }
  /**
   * next() and hasNext() should run in average O(1) time and uses O(h) memory,
   * where h is the height of the tree.
   */
  private Stack<TreeNode> stackNodes = new Stack<TreeNode>();
  private boolean checkNext;

  private void addLeftChildNodes(TreeNode node) {
    while(node != null) {
      stackNodes.push(node);
      node = node.left;
    }
  }

  public BSTIterator(TreeNode root) {
    addLeftChildNodes(root);
    checkNext= false;
  }

  /** @return whether we have a next smallest number */
  public boolean hasNext() {
    if(checkNext) {
      checkNext = false;
      TreeNode currNode = stackNodes.pop();
      addLeftChildNodes(currNode.right);
    }
    return stackNodes.size() != 0;
  }

  /** @return the next smallest number */
  public int next() {
    if(!hasNext()) {
      // Throw an exception
    }

    checkNext = true;
    return stackNodes.peek().val;
  }
}

/**
 * Your BSTIterator will be called like this:
 * BSTIterator i = new BSTIterator(root);
 * while (i.hasNext()) v[f()] = i.next();
 */
