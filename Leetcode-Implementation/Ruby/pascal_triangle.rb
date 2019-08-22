# Given numRows, generate the first numRows of Pascal's triangle.
#
# For example, given numRows = 5,
# Return
#
# [
#        [1],
#       [1,1],
#      [1,2,1],
#     [1,3,3,1],
#    [1,4,6,4,1]
# ]


# @param {Integer} num_rows
# @return {Integer[][]}
def generate(num_rows)
  pascal_rows = []

  num_rows.times do |iter|    # 0 ... (num_rows - 1)
    current_row = []
    for pos in 0..iter        # 0 ... iter, access every number
      if pos == 0 or pos == iter
        current_row.push(1)
      else
        current_row.push( pascal_rows[iter - 1][pos - 1] + pascal_rows[iter - 1][pos] )
      end
    end
    pascal_rows.push(current_row)
  end
  pascal_rows
end

rows = generate(5)
p rows
