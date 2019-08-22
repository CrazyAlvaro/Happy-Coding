# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None



class Solution:
    # @param head, a ListNode
    # @param k, an integer
    # @return a ListNode
    def reverseKGroup(self, head, k):
        """
        Reverse k nodes of a linked list at a time in group
        Return: ListNode
        """
        sentry = ListNode(0)
        sentry.next = head
        prev, curr = sentry, head
        while curr != None:
            tail = curr
            if self.hasKnodes(curr, k):
                prev.next = self.reverseKnodes(curr,k)
            else:
                break
            prev, curr = tail, tail.next

        return sentry.next

    def hasKnodes(self, node, k):
        """
        Check to see if from current node, there are k nodes remaining
        Return: boolean
        """
        count = 0
        while node != None:
            node = node.next
            #print k, count
            count = count + 1
            if count == k: 
                return True

        return False

    def reverseKnodes(self, node, k):
        """
        Reverse the next k nodes from current node
        Return: new head node
        """
        if not self.hasKnodes(node, k):
            return node
        #print "calling"
        prev, head = None, node
        for _ in range(k):
            temp = node.next
            if prev:
                node.next = prev
            prev, node = node, temp     

        # original head's next node set to current node
        head.next = node

        return prev
            
            
def printList(node):
    while node:
        print node.val
        node = node.next
# Unit Test
if __name__ == "__main__":
    inst = Solution()
    node_1 = ListNode(1)
    node_2 = ListNode(2)
    node_1.next = node_2
    node = inst.reverseKGroup(node_1, 2)
    printList(node)
