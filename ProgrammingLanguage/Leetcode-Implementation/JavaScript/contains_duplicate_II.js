// Given an array of integers and an integer k, find out whether there are two distinct indices
// i and j in the array such that nums[i] = nums[j] and the difference between i and j is at most k.

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
  // solution: maintain a hash with size (k+1)

  last_k_nums = {}

  for(var it = 0; it < nums.length; it++) {
    if (it - k -1 >= 0) last_k_nums[ nums[it - k - 1] ] = false; // clear number out of reach

    if( last_k_nums[ nums[it] ] ) {
      return true;
    } else {
      last_k_nums[ nums[it] ] = true;
    }
  }

  return false;   // not found
};

console.log(containsNearbyDuplicate([1,2,3,4,5,6,1,2], 6)); // true
console.log(containsNearbyDuplicate([1,2,3,4,5,6,1,2], 5)); // false
