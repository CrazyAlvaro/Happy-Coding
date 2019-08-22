# Two elements of a binary search tree (BST) are swapped by mistake.
#
#   Recover the tree without changing its structure.
#
#   Note:
#   A solution using O(n) space is pretty straight forward. Could you devise a constant space solution?
#   confused what "{1,#,2,3}" means? > read more on how binary tree is serialized on OJ.


# Definition for a binary tree node.
class TreeNode
    attr_accessor :val, :left, :right
    def initialize(val)
        @val = val
        @left, @right = nil, nil
    end
end

# @param {TreeNode} root
# @return {Void} Do not return anything, modify root in-place instead.
class RecoverTree
  def initialize
    @first_node = nil
    @second_node = nil
    @prev_node = nil
  end

  def swap
    @first_node.val, @second_node.val = @second_node.val, @first_node.val
  end

  def inorder_traversal(node)
    if(!node)
      return
    end

    inorder_traversal(node.left)

    if !@prev_node
      @prev_node = node
    else
      if @prev_node.val > node.val
        if @first_node
          @second_node = node
        else
          @first_node = @prev_node
          @second_node = node
        end
      end
    end

    @prev_node = node

    inorder_traversal(node.right)
  end
end

def recover_tree(root)
  # inorder traversal get the two odd nodes
  inst = RecoverTree.new
  inst.inorder_traversal(root)
  inst.swap
  return
end


one = TreeNode.new(1)
two = TreeNode.new(2)
thr = TreeNode.new(3)

#one.right = two
#two.left = thr
one.left = two

def traverse(node)
  if !node
    return
  end

  traverse(node.left)
  p node.val
  traverse(node.right)
end

traverse(one)
recover_tree(one)
traverse(one)
