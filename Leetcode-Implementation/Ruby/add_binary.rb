# Given two binary strings, return their sum (also a binary string).
#
# For example,
# a = "11"
# b = "1"
# Return "100".

# @param {String} a
# @param {String} b
# @return {String}
def add_binary(a, b)
  if a.length > b.length
    long, short = a.length, b.length
    long_num = a
  else
    long, short = b.length, a.length
    long_num = b
  end

  it = -1
  str_sum = ""
  carry = 0

  while it.abs <= short
    sum = carry + a[it].to_i + b[it].to_i
    carry = sum > 1 ? 1 : 0
    sum = sum%2
    it -= 1

    # cacatenate string
    str_sum = sum.to_s + str_sum
  end


  while it.abs <= long
    sum = carry + long_num[it].to_i
    carry = sum > 1 ? 1 : 0
    sum = sum%2
    it -= 1

    # cacatenate string
    str_sum = sum.to_s + str_sum
  end

  if carry == 1
    str_sum = carry.to_s + str_sum
  end

  str_sum
end

a = "110"
b = "101"
puts add_binary(a,b)
