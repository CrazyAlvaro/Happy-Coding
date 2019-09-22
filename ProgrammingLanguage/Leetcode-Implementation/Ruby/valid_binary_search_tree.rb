# Definition for a binary tree node.
# class TreeNode
#     attr_accessor :val, :left, :right
#     def initialize(val)
#         @val = val
#         @left, @right = nil, nil
#     end
# end

class BinarySearchTree
  attr_accessor :valid

  def initialize(root)
    @prev_val = nil
    @valid = true
    in_order_traversal(root)
  end

  def in_order_traversal(node)
    return if node == nil

    in_order_traversal(node.left)

    @valid = false if @prev_val != nil and @prev_val >= node.val
    @prev_val = node.val

    in_order_traversal(node.right)
  end

end

# @param {TreeNode} root
# @return {Boolean}
def is_valid_bst(root)
  # in order traversal, increasing
  inst = BinarySearchTree.new(root)
  return inst.valid
end
