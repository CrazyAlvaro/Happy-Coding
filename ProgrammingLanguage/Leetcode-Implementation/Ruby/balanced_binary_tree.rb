#  Given a binary tree, determine if it is height-balanced.
#  For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node

# Definition for a binary tree node.
class TreeNode
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

class BalancedTree
  attr_accessor :balanced

  def initialize
    @balanced = true
  end

  # return the height of current node
  def traverse_tree(node)
    return 0 if node == nil or @balanced == false

    left  = traverse_tree(node.left)
    right = traverse_tree(node.right)

    if (left - right).abs > 1
      @balanced = false
    end

    return [left, right].max + 1
  end
end

# @param {TreeNode} root
# @return {Boolean}
def is_balanced(root)
  inst = BalancedTree.new
  inst.traverse_tree(root)
  return inst.balanced
end

root = TreeNode.new(1)
puts is_balanced(root)
