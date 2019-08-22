/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

import java.util.*;

public class Solution {
  public List<Integer> inorderTraversal(TreeNode root) {
    Stack<TreeNode> stack_nodes = new Stack<TreeNode>();
    List<Integer> values = new ArrayList<Integer>();

    TreeNode curr_node = root;
    while(!stack_nodes.empty() || curr_node != null) {
      if(curr_node != null) {
        stack_nodes.push(curr_node);
        curr_node = curr_node.left;
      } else {
        curr_node = stack_nodes.pop();
        values.add(curr_node.val);
        curr_node = curr_node.right;
      }
    }
    return values;
  }
}
