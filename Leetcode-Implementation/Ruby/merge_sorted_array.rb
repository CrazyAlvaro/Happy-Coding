# @param {Integer[]} nums1
# @param {Integer} m
# @param {Integer[]} nums2
# @param {Integer} n
# @return {Void} Do not return anything, modify nums1 in-place instead.
def merge(nums1, m, nums2, n)
  # Merge two arrays from back to front
  # so avoid creating a new array
  first, second = m - 1, n - 1
  iter = m + n -1
  until iter < 0
    case
    when first < 0
      nums1[iter] = nums2[second]
      second -= 1
    when second < 0
      nums1[iter] = nums1[first]
      first -= 1
    when nums1[first] < nums2[second]
      nums1[iter] = nums2[second]
      second -= 1
    else
      nums1[iter] = nums1[first]
      first -= 1
    end
    iter -= 1
  end
end

num1, num2 = [1, 5, 7, 9], [3, 6, 10]
merge(num1, num1.length, num2, num2.length)
puts num1.inspect
