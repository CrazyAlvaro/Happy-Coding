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



//Note: Recursive solution is trivial, could you do it iteratively?
public class BinaryTreePreorder {
  public static class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
  }
  // Using a stack to do it iteratively
  public List<Integer> preorderTraversal(TreeNode root) {
    Stack<TreeNode> stack = new Stack<TreeNode>();
    List<Integer> traverse_values = new Vector<Integer>();

    stack.push(root);
    while(!stack.empty()) {
      TreeNode node = (TreeNode) stack.pop();

      if(node != null){
        traverse_values.add(node.val);
        stack.push(node.right);
        stack.push(node.left);
      }
    }

    return traverse_values;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    TreeNode node_1 = new TreeNode(2);
    TreeNode node_2 = new TreeNode(3);
    root.right = node_1;
    node_1.left = node_2;

    BinaryTreePreorder instance = new BinaryTreePreorder();
    System.out.println(instance.preorderTraversal(root));
  }
}
