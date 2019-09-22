class LRUCache
  # Initialize your data structure here
  # @param {Integer} capacity
  def initialize(capacity)
    @capacity, @size = capacity, 0
    @hash_map = {}   # hash in ruby 1.9+ are ordered
  end

  # @param {Integer} key
  # @return {Integer}
  def get(key)
    return -1 if !@hash_map.has_key?(key)

    value = @hash_map.delete(key)
    @hash_map[key] = value
    value
  end

  # @param {Integer} key
  # @param {Integer} value
  # @return {Void}
  def set(key, value)
    case
    when @size < @capacity
      if @hash_map.has_key?(key)
        @hash_map.delete(key)
      else
        @size += 1
      end
      @hash_map[key] = value
    when @size == @capacity
      if @hash_map.has_key?(key)
        @hash_map.delete(key)
      else
        @hash_map.shift
      end
      @hash_map[key] = value
    end
  end
end

testCache = LRUCache.new(4)
puts testCache.set(1,1)
puts testCache.set(2,2)
puts testCache.set(3,3)
puts testCache.set(4,4)
puts testCache.set(5,5)
puts testCache.set(6,6)

puts testCache.get(1)
puts testCache.get(2)
puts testCache.get(3)
puts testCache.get(4)
puts testCache.get(5)
puts testCache.get(6)
