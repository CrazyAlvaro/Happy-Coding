// Follow up for "Unique Paths":
//
// Now consider if some obstacles are added to the grids. How many unique paths would there be?
//
// An obstacle and empty space is marked as 1 and 0 respectively in the grid.
//
// For example, There is one obstacle in the middle of a 3x3 grid as illustrated below.
//
//     [
//     [0,0,0],
//     [0,1,0],
//     [0,0,0]
//     ]
//     The total number of unique paths is 2.
//
//     Note: m and n will be at most 100.

////////////////////////////////////////////////////////////////////////////////
//
//  Recursive way: time complexity: 2 ** (N ** N)
//
//  Quite intuitive but slow
//
////////////////////////////////////////////////////////////////////////////////

var traverseGrid = function(obstacleGrid, row, col, row_size, col_size) {
  // == vs ===, === has type check
  if( row >= row_size || col >= col_size || obstacleGrid[row][col] === 1) {
    return 0;
  } else if(row == row_size - 1 && col == col_size - 1 && obstacleGrid[row][col] == 0) {
    return 1;
  } else {
    result = traverseGrid(obstacleGrid, row + 1, col, row_size, col_size)
            + traverseGrid(obstacleGrid, row, col + 1, row_size, col_size);
    return result;
  }
};

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  if(obstacleGrid.length === 0 || obstacleGrid[0].length === 0)  return 0;
  var row_size = obstacleGrid.length, col_size = obstacleGrid[0].length;
  return traverseGrid(obstacleGrid, 0, 0, row_size, col_size);
};


////////////////////////////////////////////////////////////////////////////////
//
//  Dynamic Programming way
//
//  backtracking: each cell is the sum of top cell + left cell
//
//    special case: if it's a obstacle, then cell's 0
//    start point is 1
//
//  Time Complexity: O(N), N = row * col
//
////////////////////////////////////////////////////////////////////////////////
var uniquePathsWithObstacles = function(obstacleGrid) {
  if(obstacleGrid.length === 0 || obstacleGrid[0].length === 0)  return 0;

  let row_size = obstacleGrid.length, col_size = obstacleGrid[0].length;

  // setup a new grid; add one more row and col to use as 0s
  let pathGrid = [];
  for(let i = 0; i < row_size + 1; i++) pathGrid.push(new Array(col_size + 1).fill(0));

  pathGrid[1][1] = obstacleGrid[0][0] === 1 ? 0 : 1; // start with 1 way

  for(let row = 1; row <= row_size; row++){
    for(let col = 1; col <= col_size; col++){
      if( row === 1 && col === 1 ) continue;
      if(obstacleGrid[row - 1][col - 1] === 1) continue;  // still is 0

      pathGrid[row][col] = pathGrid[row - 1][col] + pathGrid[row][col - 1];
    }
  }

  return pathGrid[row_size][col_size];
};


var result = uniquePathsWithObstacles( [[0,0,0],[0,1,0],[0,0,0]] );
console.log("Expecting 2: " + result);
var result = uniquePathsWithObstacles( [[0,0,0],[0,0,0],[0,0,0]] );
console.log("Expecting 6: " + result);
