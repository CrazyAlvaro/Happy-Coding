// Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.
//
// Do not allocate extra space for another array, you must do this in place with constant memory.
//
// For example,
//     Given input array nums = [1,1,2],
//
//     Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the new length.

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  if(nums.length < 2) return nums.length;

  var prev = 0;

  for(var it = 1; it < nums.length; it++){
    if(nums[prev] === nums[it]){
      nums.splice(prev, 1);
      it--; // it remains the same position
    }else{
      prev++;
    }
  }

  return nums.length;
};


var nums = [1,1,2];
console.log(removeDuplicates(nums));
