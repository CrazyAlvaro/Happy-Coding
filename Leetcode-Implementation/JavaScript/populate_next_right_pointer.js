/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */

// Assume it's a perfect binary tree
var connect = function(root) {
  var curr = root, left_most = curr, prev = null;

  while(curr){
    if(!curr.left) break;   // end here

    if(prev) prev.next = curr.left;

    curr.left.next = curr.right;

    prev = curr.right;

    if(curr.next){
      curr = curr.next;
    }else{
      curr = left_most.left;
      left_most = left_most.left;
      prev = null;
    }
  }
};
