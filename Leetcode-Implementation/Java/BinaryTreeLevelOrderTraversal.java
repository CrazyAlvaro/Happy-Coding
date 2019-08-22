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
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> level_values = new ArrayList<List<Integer>>();

    // Store each level's nodes
    List<TreeNode> curr_level_nodes = new ArrayList<TreeNode>();

    curr_level_nodes.add(root);
    while(curr_level_nodes.size() != 0) {
      List<TreeNode> next_level_nodes = new ArrayList<TreeNode>();
      List<Integer> curr_level_values = new ArrayList<Integer>();

      TreeNode curr_node;
      for(int it = 0; it < curr_level_nodes.size(); it++) {
        curr_node = curr_level_nodes.get(it);

        if(curr_node != null) {
          curr_level_values.add(curr_node.val);

          next_level_nodes.add(curr_node.left);
          next_level_nodes.add(curr_node.right);
        }
      }

      if(curr_level_values.size() != 0) {
        level_values.add(curr_level_values);
      }

      curr_level_nodes = next_level_nodes;
    }

    return level_values;
  }
}
