
//Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and set.
//
//get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
//set(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.


var key_value_map = {};         // object used to store each keys' array position
var key_array = [];     // used to store values, the one at the end is the least recently used one
var size = 0, cache_capacity = 0;
/**
 * @constructor
 */
var LRUCache = function(capacity) {
  key_value_map = {};
  key_array = [];
  size = 0;
  cache_capacity = 0;
  cache_capacity = capacity;
};

/**
 * @param {number} key
 * @returns {number}
 */
LRUCache.prototype.get = function(key) {
  //update position if necessary
  if(key_value_map[key]) {
    key_array.splice(key_array.indexOf(key), 1)
    key_array.unshift(key);
    return key_value_map[key];
  } else {
    return -1;
  }
};

/**
 * @param {number} key
 * @param {number} value
 * @returns {void}
 */
LRUCache.prototype.set = function(key, value) {
  if(key_value_map[key]) {
    key_array.splice(key_array.indexOf(key), 1)
    key_array.unshift(key);
    key_value_map[key] = value; // update value if necessary
    return;
  }

  // Not previously exist
  if(size === cache_capacity) {
    key_array.unshift(key);
    key_value_map[key] = value;
    delete key_value_map[(key_array.pop())];
  } else {
    size++;
    key_value_map[key] = value;
    key_array.unshift(key);
  }
};


var testCache = new LRUCache(4);
console.log(testCache.set(1,1));
console.log(testCache.set(2,2));
console.log(testCache.set(3,3));
console.log(testCache.set(4,4));
console.log(testCache.set(5,5));
console.log(testCache.set(6,6));

console.log(testCache.get(1));
console.log(testCache.get(2));
console.log(testCache.get(3));
console.log(testCache.get(4));
console.log(testCache.get(5));
console.log(testCache.get(6));
