# Definition for a binary tree node.
class TreeNode
  attr_accessor :val, :left, :right
  def initialize(val)
    @val = val
    @left, @right = nil, nil
  end
end

class PathSum
  attr_accessor :found_target

  def initialize(root, sum)
    @found_target = false
    @current_sum = 0
    pre_order_traversal(root, sum)
  end

  def pre_order_traversal(node, target_sum)
    return if node == nil or @found_target

    @current_sum += node.val

    if node.left == nil and node.right == nil and @current_sum == target_sum
      @found_target = true
      return
    end

    pre_order_traversal(node.left, target_sum)
    pre_order_traversal(node.right, target_sum)

    @current_sum -= node.val
  end
end

# @param {TreeNode} root
# @param {Integer} sum
# @return {Boolean}
def has_path_sum(root, sum)
  #pre-order traversal
  inst = PathSum.new(root, sum)
  return inst.found_target
end

root = TreeNode.new(1)
puts has_path_sum(root, 1)
