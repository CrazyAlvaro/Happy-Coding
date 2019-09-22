# Given an array of strings, group anagrams together.
#
#   For example, given: ["eat", "tea", "tan", "ate", "nat", "bat"],
#   Return:
#
#   [
#     ["ate", "eat","tea"],
#     ["nat","tan"],
#     ["bat"]
#   ]
#
# Note:
#   For the return value, each inner list's elements must follow the lexicographic order.
#   All inputs will be in lower-case.

# @param {String[]} strs
# @return {String[][]}
def group_anagrams(strs)
  # sort each string, use a hash to store each sorted string
  # complexity: n * m*lgm, m is length of each string

  strs.sort!  # sort alphabetically
  anagram_group = {}

  for curr_str in strs
    # all in lower case
    sorted_str = curr_str.chars.sort.join
    if anagram_group[sorted_str] != nil
      anagram_group[sorted_str].push(curr_str)
    else
      anagram_group[sorted_str] = [curr_str]
    end
  end

  return anagram_group.values
end


puts group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]).inspect
