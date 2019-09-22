#  The count-and-say sequence is the sequence of integers beginning as follows:
#  1, 11, 21, 1211, 111221, ...
#
#  1 is read off as "one 1" or 11.
#  11 is read off as "two 1s" or 21.
#  21 is read off as "one 2, then one 1" or 1211.
#  Given an integer n, generate the nth sequence.
#
#  Note: The sequence of integers will be represented as a string.


# @param {Integer} n
# @return {String}
def count_and_say(n)
  sequence = '1'
  return sequence if n == 1
  n = n - 1   # original is 1

  it = 0
  while it < n do
    new_squence = String.new
    prev_char, counter = '', 1
    sequence.each_char { |char|
      if prev_char == char
        counter += 1
      elsif prev_char == ''
        prev_char = char
      else
        new_squence = new_squence + counter.to_s + prev_char
        counter = 1
        prev_char = char
      end
    }
    new_squence = new_squence + counter.to_s + prev_char
    sequence = new_squence
    it += 1
  end

  return sequence
end

puts count_and_say(1)
puts count_and_say(2)
puts count_and_say(3)
puts count_and_say(4)
puts count_and_say(5)
