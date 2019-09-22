# @param {String} s
# @param {String} t
# @return {Boolean}
def is_anagram(s, t)
  # if t is an anagram of s

  # 1, sort & compare 2, hash up hash down, size == 0 ?

  char_hash = {}
  s.each_char do |char|
    if char_hash[char] == nil
      char_hash[char] = 1
    else
      char_hash[char] += 1
    end
  end

  t.each_char do |char|
    if char_hash[char] == nil
      return false
    else
      char_hash[char] -= 1
      char_hash.delete(char) if char_hash[char] == 0
    end
  end

  return char_hash.size == 0
end

puts is_anagram("anagram", "nagaram")     # all lower cases?, special char?
puts is_anagram("rat", "car")
puts is_anagram("ab", "a")

