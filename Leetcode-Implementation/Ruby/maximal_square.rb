# @param {Character[][]} matrix
# @return {Integer}
def maximal_square(matrix)
  return 0 if matrix.size == 0

  row_size, col_size = matrix.size, matrix[0].size
  max_size = 0

  square_matrix = Array.new(row_size + 1) { Array.new(col_size + 1, 0)} # Initialize a 2-d array

  (1..row_size).each do |row|
    (1..col_size).each do |col|
      if matrix[row-1][col-1] == "1"
        curr_size = [square_matrix[row-1][col-1], square_matrix[row][col-1], square_matrix[row-1][col]].min + 1
        square_matrix[row][col] = curr_size
        max_size = max_size >= curr_size ? max_size : curr_size
      end
    end
  end
  max_size * max_size
end


puts "[\"1\"]  maximal_square is: #{maximal_square(["1"])}"
puts "[\"11\", \"11\"]  maximal_square is: #{maximal_square(["11","11"])}"
