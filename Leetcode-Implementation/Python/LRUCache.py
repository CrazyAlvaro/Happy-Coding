class LRUCache:
    """ Implement Least Recent Used Cache"""    
    # @param capacity, an integer
    def __init__(self, capacity):
        """constructor, initialize capacity"""
        self._used_list_ = list()   # with size capacity
        self._cache_ = dict()
        self._size_ = 0
        self._capacity_ = capacity 
    
    # @return an integer
    def get(self, key):
        """ return the value of key"""
    
        # if key in dict, return dict[key], otherwise -1
        if key in self._cache_:
            # update the key to most recent used one
            self._used_list_.remove(key)
            self._used_list_.insert(0,key)
            return self._cache_[key]
        else:
            return -1

    
    # @param key, an integer
    # @param value, an integer
    # @return nothing
    def set(self, key, value):
        """ 
        Set the value for key, if cache is full
        removed the least recent used one
        """
        
        # check if it's already in, if so, update to most recent used
        if key in self._cache_:
            self._cache_[key] = value       # udpate value
            self._used_list_.remove(key)
            self._used_list_.insert(0, key)
        else:
            if self._size_ == self._capacity_:
                del self._cache_[self._used_list_[-1]]        
                self._used_list_.pop()      
                self._used_list_.insert(0, key)
                self._cache_[key] = value
            else:
                self._used_list_.insert(0, key)
                self._cache_[key] = value
                self._size_ += 1
        
if __name__ == "__main__":
    inst = LRUCache(10)
    inst.set(1 ,1 )
    inst.set(2 ,2 )
    inst.set(3 ,3 )
    inst.set(4 ,4 )
    inst.set(5 ,5 )
    inst.set(6 ,6 )
    inst.set(7 ,7 )
    inst.set(8 ,8 )
    inst.set(9 ,9 )
    inst.set(10,10)
    inst.set(11,11)
    inst.set(12,12)

    print inst.get(1)
    print inst.get(2)
    print inst.get(3)
    print inst.get(4)
    print inst.get(5)
    print inst.get(6)
    print inst.get(7)
    print inst.get(8)
    print inst.get(9)
    print inst.get(10)
    print inst.get(11)
    print inst.get(12)
      
