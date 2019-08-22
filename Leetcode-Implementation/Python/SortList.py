# definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

##########################################
#
#   Quicksort: got time limit exceed 
#
#########################################
class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def sortList(self, head):
        """ sort list in O(nlogn) using constant space"""
        if not head:
            return head
        head, tail = self.quickSort(head)
        return head

    def quickSort(self, head):
        """
        use quick sort method to recusively sort sub_list
        return sorted sub_list head and tail as a tuple
        """
        if head == None or head.next == None:
            return (head, head)
        
        # get pivot value
        pivot_node = self.getPivotNode(head)
        
        # partition list
        fir_head, sec_head = self.partitionList(head, pivot_node)

        fir_head, fir_tail = self.quickSort( fir_head )
        sec_head, sec_tail = self.quickSort( sec_head )
        
        if fir_tail:                    # fir not list empty
            fir_tail.next = pivot_node
            if sec_head:
                pivot_node.next = sec_head
                return (fir_head, sec_tail)
            else:                       # sec list empty
                pivot_node.next = None  # partition tail
                return (fir_head, pivot_node)
        else:                           # fir list empty
            if sec_head:                # sec list not empty
                pivot_node.next = sec_head
                return (pivot_node, sec_tail)
            else:                       # sec list empty
                pivot_node.next = None  # partition tail
                return (pivot_node, pivot_node)
            
        #if fir_tail:
        #    fir_tail.next = sec_head
        #    return (fir_head, sec_tail)
        #else:   # fir list is empty
        #    return (sec_head, sec_tail)
        
        #return (fir_head, sec_tail)


    def partitionList(self, head, pivot_node):
        """
        Divide list into two sub list
        return fir_head and sec_head as a tuple
        """
        fir_sentry, sec_sentry = ListNode(0), ListNode(0)
        fir_node, sec_node = fir_sentry, sec_sentry
        while head:
            if head.val > pivot_node.val:
                sec_node.next = head
                sec_node = sec_node.next
            elif head != pivot_node:               #head.val <= pivot_node.val:
                fir_node.next = head
                fir_node = fir_node.next
            else:
                pass
                    

            head = head.next                
        
        # really partition two sub_lists
        fir_node.next = None
        sec_node.next = None
        
        return (fir_sentry.next, sec_sentry.next)


    def getPivotNode(self, head):
        """
        For a list, return the medium of first three nodes, if exits 
        """ 
        if not head:
            return head
        # get first three nodes
        nodes = list()
        curr = head
        for _ in range(3):
            if curr:
                nodes.append(curr)
                curr = curr.next
            else:   # otherwise return the first one
                return head
        
        sorted(nodes, cmp = lambda fir, sec: cmp(fir.val, sec.val) )
        return nodes[1]     # return the middle of three


##########################################
#
#   MergeSort: got accepted by leetcode
#
#########################################
class Solution:
    # @param head, a ListNode
    # @return a ListNode
    def sortList(self, head):
        """ sort list in O(nlogn) using constant space"""
        size = self.getListLength(head)
        head =  self.sortSubList(head, size)
        return head 

    def getListLength(self, head):
        """ get the length of a list, return a int"""
        size = 0
        while head:
            head = head.next
            size +=1
        return size

    def sortSubList(self, head, size):
        """ 
        Sort sub_list with head node and list size 
        Return a new head node
        """
        # no need to sort 
        if size == 0 or size == 1:
            return head

        fir_length = size / 2
        firNode, secNode = self.partitionList( head, fir_length)
        
        # recursive sort two sub_list
        firNode = self.sortSubList(firNode, fir_length)
        secNode = self.sortSubList(secNode, size - fir_length)
        
        # merge two sub_list and return new head
        return self.mergeLists(firNode, secNode)

    def partitionList(self, head, length):
        """
        Partition list with length
        Return tuple(fir_head, sec_head)
        """ 
        curr, prev = head, None
        while curr and length > 0:
            prev = curr
            curr = curr.next
            length = length - 1
       
        # seperate the first part 
        if prev:
            prev.next = None

        return (head, curr)

    def getNthNode(self, head, nth):
        """ 
        Get the nth node in list, head is 1th
        If n > list length, return None, otherwise ListNode
        """
        nthNode = head 
        while nthNode and nth > 1:
            nthNode = head.next
            nth = nth - 1

        return nthNode

    def mergeLists(self, firNode, secNode):
        """ merge two sub_list and return the head """
        # create sentry node
        sentry = ListNode(0)
        curr = sentry

        while firNode and secNode:
            if firNode.val <= secNode.val:
                curr.next = firNode
                firNode = firNode.next
            else:
                curr.next = secNode
                secNode = secNode.next
            curr = curr.next
            

        # only one node is None 
        curr.next = firNode if firNode else secNode

        # return new head
        return sentry.next




def printList(head):
    iter = 0
    while head:
        iter += 1
        if iter  == 20:
            break
        print head.val
        head = head.next

if __name__ == "__main__":
    node_1 = ListNode(1)
    node_2 = ListNode(2)
    node_3 = ListNode(3)
    node_4 = ListNode(4)
    node_5 = ListNode(5)
    node_6 = ListNode(6)
    node_7 = ListNode(7)
    node_8 = ListNode(8)
    node_9 = ListNode(9)

    node_1.next = None 
    node_2.next = node_1
    node_3.next = node_2
    node_4.next = node_3
    node_5.next = node_4
    node_6.next = node_5
    node_7.next = node_6
    node_8.next = node_7
    node_9.next = node_8

    printList(node_9)
    inst = Solution()
    print "After sort list:\n"
    #printList( inst.sortList(node_9) )
    #printList( inst.sortList(None) )    # test special case
    pivot = inst.getPivotNode(node_9)
    print pivot.val
    fir, sec = inst.partitionList(node_9, node_9)
    #print fir.val, sec.val
