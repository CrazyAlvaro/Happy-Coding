// Remove all elements from a linked list of integers that have value val.
//
// Example
// Given: 1 --> 2 --> 6 --> 3 --> 4 --> 5 --> 6, val = 6
// Return: 1 --> 2 --> 3 --> 4 --> 5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  if(!head) return head;    // head is undefined or null

  // create a senital
  var senital = new ListNode(0);    // create a new object
  senital.next = head;

  var prev = senital, curr = head;

  while(curr){
    if(curr.val === val){
      prev.next = curr.next;
      curr = curr.next;
    }else{
      prev = curr;
      curr = curr.next;
    }
  }

  return senital.next;
};



