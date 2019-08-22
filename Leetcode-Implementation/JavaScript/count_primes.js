// Description:
//
// Count the number of prime numbers less than a non-negative number, n.

/**
 * @param {number} n
 * @return {number}
 */

var isOddPrime = function(num) {
  // check if a odd number is a prime
  var sqrt = Math.sqrt(num);
  for(var it = 3; it <= sqrt; it += 2){
    if(num % it === 0) return false;
  }
  return true;
};

var countPrimes = function(n) {
  if(n < 3) return 0;

  var count = 1;    // 2 is prime

  for(var it = 3; it < n; it += 2){   // check every odd number greater and equal to 2
    if(isOddPrime(it)) count++;
  }

  return count;
};
