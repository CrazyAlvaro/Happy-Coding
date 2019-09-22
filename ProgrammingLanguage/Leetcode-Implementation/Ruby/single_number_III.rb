def single_number(nums)
  # constant space complexity
  diff = 0
  res = [0, 0]
  # first pass:   get (a XOR b), since a != b, there must be one bit is '1'
  for num in nums
    diff ^= num
  end

  diff &= -diff   # Get the least significant bit:

  # second pass:  divide nums into two groups, one with that bit '1', one with '0'
  #               a, b is in two group
  for num in nums
    if diff & num == 0
      res[0] ^= num
    else
      res[1] ^= num
    end
  end
  res
end

def single_number_1(nums)
  hash = Hash.new
  for num in nums
    if !hash[num]
      hash[num] = true
    else
      hash.delete(num)
    end
  end
  return hash.keys
end

puts single_number([1,2,2,1,44,4,11,4,55,55,44,9])
