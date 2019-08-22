# Definition for singly-linked list with a random pointer.
# class RandomListNode:
#     def __init__(self, x):
#         self.label = x
#         self.next = None
#         self.random = None

class Solution:
    # @param head, a RandomListNode
    # @return a RandomListNode
    def copyRandomList(self, head):
        """ There is a method use current list to create a copy of current node
            to its next, then construct the every next node of original list with
            its random pointer, finally divide this list with original list and
            new copy list, which totally require 3 times run over the list.

            The above method do doesn't use extra space than needed to create a
            new list, but in my opinion, it's less generality than the common
            hashmap method which use O(n) space, code would be much clean with
            hashmap method
        """

        node_dict = dict()
        curr_node, prev_node, new_head = head, None, None


        # create a new list copy
        while curr_node != None:
            new_node = RandomListNode(curr_node.label)
            node_dict[ new_node.label ] = new_node

            if prev_node == None:
                    new_head = new_node 
            else:
                prev_node.next = new_node
            
            curr_node = curr_node.next
            prev_node = new_node

        curr_node = head
        new_node = new_head
        
        # construct the random pointer for each new list node
        while curr_node != None:
            if curr_node.random != None:
                random_node = node_dict[ curr_node.random.label ]
                new_node.random = random_node
            curr_node = curr_node.next
            new_node = new_node.next

        return new_head
        
            


