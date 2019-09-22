# Definition for singly-linked list.
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    # @param head, a ListNode
    # @return nothing
    def reorderList(self, head):
        """ use O(N) space to store each node"""
        node_list = []
        curr = head
        #print " tset " + str(curr.val)
        while curr != None:
            node_list.append(curr)
            #print curr.val
            curr = curr.next

        length = len(node_list)
        if length < 3:
            return

        for idx in range(length/2):
            #print "first " +str(node_list[idx].val) + " " + str(node_list[length-1-idx].val) 
            node_list[idx].next = node_list[length-1-idx]
            
            if idx != 0:
                #print "second " + str(node_list[length-idx].val) + " " + str(node_list[idx].val)
                node_list[length - idx].next = node_list[idx]
        
        if length % 2 == 1:
            node_list[length/2 +1].next = node_list[length/2]
       
        # this is very important, don't forget 
        node_list[length/2].next = None

        #for idx in range(length):
        #    if node_list[idx].next != None:
        #        print node_list[idx].next.val
        #    else:
        #        print "none" + str(idx)
        #print head.next.val
        #count = 0
        #while head:
        #    if count == 12:
        #        break
        #    count += 1
        #    print head.val
        #    head = head.next

if __name__ == "__main__":
    node1 = ListNode(1)
    node2 = ListNode(2)
    node3 = ListNode(3)
    node4 = ListNode(4)
    node5 = ListNode(5)
    node6 = ListNode(6)
    node1.next = node2
    node2.next = node3
    node3.next = node4
    node4.next = node5
    node5.next = node6

    inst = Solution()
    inst.reorderList(node1)

#TLE
#class Solution:
#    # @param head, a ListNode
#    # @return nothing
#    def reorderList(self, head):
#        """ reorder linked list L0 -> Ln -> L1 -> Ln-1"""
#        if head == None:    return
#
#        remain_head = head
#        while remain_head and remain_head.next:
#            prev = remain_head
#            curr = remain_head.next
#            while curr.next:
#                prev, curr = curr, curr.next
#            prev.next = None
#            temp_node = remain_head.next    
#            remain_head.next = curr
#            curr.next = temp_node
#            remain_head = temp_node
#            
        

