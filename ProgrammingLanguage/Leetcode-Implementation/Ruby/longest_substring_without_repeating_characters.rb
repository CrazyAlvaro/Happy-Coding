# Given a string, find the length of the longest substring without repeating characters.
# For example, the longest substring without repeating letters for "abcabcbb" is "abc",
# which the length is 3. For "bbbbb" the longest substring is "b", with the length of 1.

# @param {String} s
# @return {Integer}
def length_of_longest_substring(s)
  # maitain a hash, contains current word's characters
  # Keep pointer to the start of the word

  return s.length if s.length < 2
  #char_hash = {}
  char_hash = Hash.new

  start, curr = 0, 1
  longest = 1
  char_hash[s[start]] = 0

  while curr < s.length
    curr_char = s[curr]
    if char_hash[curr_char].nil?  #not exist
      char_hash[curr_char] = curr
      longest = (curr - start + 1) > longest ? curr - start + 1 : longest
    else
      # existed, update hash, start, check longest
      longest = (curr - start) > longest ? curr - start : longest

      # Remove characters from start to duplicate one
      for i in start..(char_hash[curr_char] - 1)
        char_hash.delete(s[i])
      end

      start = char_hash[curr_char] + 1    # update start pos
      char_hash[curr_char] = curr         # update hash position of curr_char
    end
    curr += 1
  end
  longest
end

puts length_of_longest_substring("ab")
puts length_of_longest_substring("abcabcbb")
puts length_of_longest_substring("bbbbb")
puts length_of_longest_substring("abcdefabcbb")
puts length_of_longest_substring("abcabcdbb")
