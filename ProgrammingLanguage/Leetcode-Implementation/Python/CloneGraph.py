#class UndirectedGraphNode:
#    def __init__(self, x):
#        self.label = x
#        self.neighbors = []


class Solution:
    """
    # param node, a undirected graph node
    # return a undirected graph node
    """
    def cloneGraph(self, node):
        """
        BFS and hashmap, clone a graph
        """
        if node == None:
            return None
        self._node_map_ = dict()
        self._copied_map_ = dict()
        level_nodes = [node]

        while len( level_nodes ) != 0:
            new_level_nodes = []
            for original_node in level_nodes:
                # if node has been copied, skip
                if original_node.label in self._copied_map_:
                    continue
                self.copyNode( original_node )
                new_level_nodes += original_node.neighbors
                
            level_nodes = new_level_nodes

        return self._node_map_[node.label]
                
    def copyNode(self, node):
        """ copy a node with its neighbors"""
        if node == None:    
            return None
        
        copy_node = self.checkNode(node) 
        copy_neigh =[]
        # get copy_node neighbor list
        for neigh_node in node.neighbors:
            copy_neigh.append( self.checkNode(neigh_node) )
        copy_node.neighbors = copy_neigh
        self._copied_map_[copy_node.label] = copy_node

    def checkNode(self, node):
        """
        check whether node has been copied in self._node_map_
        if it is, return the node, otherwise create a new one, add to self._node_map_
        """
            
        if node == None:
            return None

        if node.label in self._node_map_:
            return self._node_map_[node.label]
        else:
            copy_node = UndirectedGraphNode(node.label)
            self._node_map_[copy_node.label] = copy_node
            return copy_node

