=begin solution 1
def alphanumeric?(char)
  char =~ /[[:alpha:]]/ || char =~ /[[:digit:]]/
end

def prev_alphanumeric_index(s, index)
  index -= 1
  while index >= 0 && !alphanumeric?(s[index])
    index -= 1
  end
  return index
end

def next_alphanumeric_index(s, index)
  index += 1
  while index < s.size && !alphanumeric?(s[index])
    index += 1
  end
  return index
end

# @param {String} s
# @return {Boolean}
def is_palindrome(s)
  return true if s.size < 1

  a, b = next_alphanumeric_index(s, -1), prev_alphanumeric_index(s, s.size)

  while a < b
    #puts "current char is #{a} #{s[a]} and #{b} #{s[b]}"
    return false if s[a].downcase != s[b].downcase
    a, b = next_alphanumeric_index(s, a), prev_alphanumeric_index(s, b)
  end
  return true
end
=end


def is_palindrome(s)
  str = s.gsub(/[^0-9a-z]/i, "")
  str.downcase!
  a, b = 0, str.size - 1
  while a < b
    return false if str[a] != str[b]
    a += 1
    b -= 1
  end
  true
end

puts "\"ab c 2 3 %2 C *bA\" should be true: #{is_palindrome("ab c 2 3 %2 C *bA")}"

test_b = "race a car"
puts "#{test_b} should be false: #{is_palindrome(test_b)}"

test_c = "A man, a plan, a canal: Panama"
puts "#{test_c} should be true: #{is_palindrome(test_c)}"
