# Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
# The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.

# @param {String} s
# @return {Boolean}
def is_valid(s)
  # using a stack to store bracket
  stack = []
  s.each_char { |char|
    case char
    when '(', '{', '['
      stack.push(char)
    when ')'
      return false if stack.last != '(' or stack.size == 0
      stack.pop
    when '}'
      return false if stack.last != '{' or stack.size == 0
      stack.pop
    when ']'
      return false if stack.last != '[' or stack .size == 0
      stack.pop
    else
      return false
    end
  }
  return stack.size == 0
end

puts is_valid('()')
puts is_valid('(){}[]')
puts is_valid('([)]')
puts is_valid('sfa')
