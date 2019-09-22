class NQueen
  def initialize(length)
    @length = length
    @mask = (1 << length) - 1
    @solutions = []
    @str_boards = []
  end

  def generate_chess
    left_diag, central, right_diag, row_index = 0, 0, 0, 0    # Use to represent invalid Queen positions
    board = []
    generate_help(board, left_diag, central, right_diag, row_index)
    #puts "This is solutions: #{@solutions.inspect}"
    convert_board(@solutions)
    #puts "something #{@str_boards.inspect}"
    @str_boards
  end

  def convert_board(num_boards)
    # Convert number to string board "....Q
    num_boards.each do |num_board|
      board = []
      for position in num_board
        line = "." * @length
        pos = Math.log2(position).to_i
        line[-(pos + 1)] = "Q"

        board.push(line)
      end
      @str_boards.push(board)
    end
  end

  def generate_help(board, left_diag, central, right_diag, row_index)
    if row_index == @length
      @solutions.push(board)
      return
    end

    positions = @mask & ( ~(left_diag | central | right_diag) )

    iter = 0
    while positions != 0
      # Get the least significant bit
      pos = positions & -positions
      positions -= pos  # clear current pos

      new_board = board.dup
      new_board.push(pos)

      # traverse to next level
      generate_help(new_board, (left_diag + pos) << 1, central + pos, (right_diag + pos) >> 1, row_index + 1 )
    end
  end
end


# @param {Integer} n
# @return {String[][]}
def solve_n_queens(n)
  # Try to use bit manipulation and Depth First Search for all possible solutions
  inst = NQueen.new(n)
  inst.generate_chess.inspect
end

solve_n_queens(4)
