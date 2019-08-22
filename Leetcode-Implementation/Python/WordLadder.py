import string

class Solution:
    # @param start, a string
    # @param end, a string
    # @param dict, a set of string
    # @return an integer
    def ladderLength(self, start, end, dict):
        """ 
        Find the shortest path number from start to end 
        Return: number of shortest path, -1 if not exist
        """
        # we can delete each visited node form dict each time
        # also no need to visited the same node again
        #self._visited_str_ = dict()     
        self._curr_len_ = 1
        self._found_ = False
        self._end_ = end
        self._visited = {}
        level_str = [start]
        
        while len(level_str) != 0:
            level_str = self.findAdjacent( level_str, dict ) 
            #print level_str
            if self._found_:
                return self._curr_len_
        return 0

    def findAdjacent(self, level_str, dict):
        """ 
        Find valid ajacent string for a list of string
        Return a list of string
        """
        next_level = list()
        for string in level_str:
            next_level = next_level + self.strAdjacent( string, dict ) 
            if self._found_:
                self._curr_len_ += 1 
                return next_level
        self._curr_len_ += 1 
        return next_level

    def strAdjacent(self, curr_string, dict ):
        """
        Find each string's valid ajacent
        Return a list of strings
        """
        adjacents = list()
        #str_list = list(curr_string)
        #for idx in range(len(str_list)):
        for idx in range(len(curr_string)):
            prefix, suffix = curr_string[:idx], curr_string[idx+1:] 
            for char in string.ascii_lowercase:
                candidate_str = prefix + char + suffix 
                if candidate_str ==  self._end_:
                    self._found_ = True
                    return adjacents 
                ##
                ##
                ## Key, maintain a visited dict to avoid duplicate visiting
                if candidate_str in dict and candidate_str not in self._visited:
                    self._visited[candidate_str] = 0
                    adjacents.append(candidate_str)

        return adjacents
                        
if __name__ == "__main__":
    start = "hit"
    end = "cog"
    dict = ["hot","dot","dog","lot","log"]
    inst = Solution()
    print inst.ladderLength(start, end, dict)
