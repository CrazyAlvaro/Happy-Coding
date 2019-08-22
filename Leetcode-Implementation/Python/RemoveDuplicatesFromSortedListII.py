"""
Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

For example,
Given 1->2->3->3->4->4->5, return 1->2->5.
Given 1->1->1->2->3, return 2->3.
"""


# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def deleteDuplicates(self, head):
        if not head:
            return head

        # Create a sentry node diff from head
        sentry = ListNode(0)
        if head.val != 0:
            pass 
        else:
            sentry.val = 1 

        sentry.next = head
        prev, curr = sentry, head 
        while curr:
            if self.isDuplicateNode(curr):
                curr = self.getNextDistinceNode(curr)
                prev.next = curr
            else:
                prev, curr = curr, curr.next

        return sentry.next

    def isDuplicateNode(self, node):
        """
        Check whether node is a duplicate node to end
        Return a boolean
        """
        if node and node.next and node.val  == node.next.val:
            return True
        else:
            return False

    def getNextDistinceNode(self, node):
        """
        Get the next node's val different fron node.val
        If doesn't exist, return None
        Return: a ListNode
        """
        if not node:
            return node
        
        prev, currNode = node, node.next
        while currNode: 
            if prev.val != currNode.val:
                return currNode
            else:
                prev, currNode = currNode, currNode.next

        return currNode


def printList(node):
    while node:
        print node.val
        node = node.next

# Unit Test        
if __name__ == "__main__":

    #Given 1->2->3->3->4->4->5, return 1->2->5.
    #Given 1->1->1->2->3, return 2->3.
    node_1 = ListNode(1)
    node_2 = ListNode(1)
    node_3 = ListNode(3)
    node_4 = ListNode(3)
    node_5 = ListNode(4)
    node_6 = ListNode(4)
    node_7 = ListNode(5)

    node_1.next = node_2
    node_2.next = node_3
    node_3.next = node_4
    node_4.next = node_5
    node_5.next = node_6
    node_6.next = node_7

    inst = Solution()
    printList(node_1)
    node_1 = inst.deleteDuplicates( node_1)
    printList(node_1)

