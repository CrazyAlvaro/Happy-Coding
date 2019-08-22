# Implement a trie with insert, search, and startsWith methods.
# You may assume that all inputs are consist of lowercase letters a-z.

class TrieNode
  # Initialize your data structure here.
  def initialize(char)
    @char = char
    @chars_hash = Hash.new    # store child nodes
    @word_hash = Hash.new     # store word hash, boolean
  end

  def set_word(char)
    @word_hash[char] = true
  end

  def isword?(char)
    @word_hash[char]
  end

  def child_hash_exist?(char)
    @chars_hash[char]   # return a TrieNode or nil
  end

  def get_child_hash(char)
    if !child_hash_exist?(char)
      @chars_hash[char] = TrieNode.new(char)  # create one if not exist
    end
    @chars_hash[char]
  end
end

class Trie
  def initialize
    @root = TrieNode.new('*') # no meaning
  end

  # @param {string} word
  # @return {void}
  # Inserts a word into the trie.
  def insert(word)
    prev, curr = nil, @root

    # loop through characters in this word
    word.each_char { |char|
      prev = curr
      curr = curr.get_child_hash(char)
    }

    prev.set_word(word[-1]) # set word
  end

  # @param {string} word
  # @return {boolean}
  # Returns if the word is in the trie.
  def search(word)
    prev, curr = nil, @root
    word.each_char { |char|
      prev = curr
      if curr.child_hash_exist?(char)
        curr = curr.get_child_hash(char)
      else
        return false
      end
    }
    return prev.isword?(word[-1]) ? true : false
  end

  # @param {string} prefix
  # @return {boolean}
  # Returns if there is any word in the trie
  # that starts with the given prefix.
  def starts_with(prefix)
    curr = @root
    prefix.each_char{ |char|
      if curr.child_hash_exist?(char)
        curr = curr.get_child_hash(char)
      else
        return false
      end
    }
    return true
  end
end

# Your Trie object will be instantiated and called as such:
trie = Trie.new
p trie.insert("somestring")
p trie.search("key")
p trie.search("some")
p trie.search("somestring")
p trie.starts_with("something")
p trie.starts_with("som")
