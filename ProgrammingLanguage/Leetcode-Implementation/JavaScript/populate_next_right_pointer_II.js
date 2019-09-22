//Follow up for problem "Populating Next Right Pointers in Each Node".
//
//What if the given tree could be any binary tree? Would your previous solution still work?
//
//Note:
//
//  You may only use constant extra space.
//  For example,
//      Given the following binary tree,
//        1
//       /  \
//      2    3
//     / \    \
//    4   5    7
//
//  After calling your function, the tree should look like:
//
//        1 -> NULL
//       /  \
//      2 -> 3 -> NULL
//     / \    \
//    4-> 5 -> 7 -> NULL

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

var connect = function(curr) {
  // soluction, take each current step as a stone to traver the linked list horizontally

  // traverse the linked list, connect all nodes horizontally
  var most_left = null;
  var prev = null;

  while(curr){
    // check left child node
    if(curr.left){
      most_left = most_left || curr.left;   // memory the most left
      if(prev) prev.next = curr.left;
      prev = curr.left;
    }

    // check right child node
    if(curr.right){
      most_left = most_left || curr.right;
      if(prev) prev.next = curr.right;
      prev = curr.right;
    }

    if(curr.next){        // go to the next
      curr = curr.next;
    }else if(most_left){  // go to the next level
      curr = most_left;
      most_left = null;
      prev = null;
    }else{                // end
      break;
    }
  }
};
