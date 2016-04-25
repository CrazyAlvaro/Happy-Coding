# From Chapter 1, The Ruby Programming Language
#
# Example 1-1 A Sudoku solver in Ruby

module Sudoku
  class Puzzle

    ASCII = ".123456789"
    BIN = "\000\001\002\003\004\005\006\007\010\011"

    def initialize(lines)
      if (lines.respond_to? :join)    # If argument looks like an array of lines
        s = lines.join
      else
        s = lines.dup                 # Assume we have a string and make a private copy
      end

      # Remove whitespace
      s.gsub!(/\s/, "")

      # check for invalid characters, and save the location of the first
      if i = s.index(/[^123456789\.]/)
        raise Invalid, "Illegal character #{s[i,1]} in puzzle"
      end

      # TODO
      s.tr!(ASCII, BIN)               # Translate ASCII characters into bytes
      @grid = s.unpack('c*')          # Now unpack the bytes into an array of numbers

      #Make sure that the rows, columns, and boxes have no duplicates
      raise Invalid, "Initial puzzle has duplicates" if has_duplicates?
    end

    # Return the state of the puzzle as a string of 9 lines with 9
    # characters (plus newline) each.
    def to_s
      (0..8).collect { |r|
        @grid[r*9,9].pack('c9')       # TODO
      } .join("\n").tr(BIN,ASCII)
    end

    # TODO
    def dup
      copy = super                    # Make a shallow copy by calling Object.dup
      @grid = @grid.dup               # Make a new copy of the internal data
      copy                            # Return the copied object
    end

    def [](row, col)
      @grid[row*9 + col]
    end

    def [](row, col, newvalue)
      unless (0..9).include? newvalue
        raise Invalid, "illegal cell value"
      end

      @grid[row*9 + col] = newvalue
    end

    # This array maps from one-dimensional grid index to box number
    BoxOfIndex = [
     0,0,0,1,1,1,2,2,2,
     0,0,0,1,1,1,2,2,2,
     0,0,0,1,1,1,2,2,2,
     3,3,3,4,4,4,5,5,5,
     3,3,3,4,4,4,5,5,5,
     3,3,3,4,4,4,5,5,5,
     6,6,6,7,7,7,8,8,8,
     6,6,6,7,7,7,8,8,8,
     6,6,6,7,7,7,8,8,8,
    ].freeze

    def each_unknown
      0.upto 8 do |row|
        0.upto 8 do |col|
          index = row*9+col
          next if @grid[index] != 0       # already has value
          box = BoxOfIndex[index]
          yield row, col, box             # Invoke the asociated block
        end
      end
    end

    def has_duplicates?
      # uniq! returns nil if all the elements in an array are unique
      # so if uniq! returns something then the board has duplicates
      0.upto(8) {|row| return true if rowdigits(row).uniq! }
      0.upto(8) {|col| return true if coldigits(col).uniq! }
      0.upto(8) {|box| return true if boxdigits(box).uniq! }

      false # otherwise return false
    end

    AllDigits = [1,2,3,4,5,6,7,8,9].freeze    #TODO

    def possible(row, col, box)
      AllDigits - (rowdigits(row) + coldigits(col) + boxdigits(box))
    end


    private

    def rowdigits(row)
      @grid[row*9,9] - [0]    # Get subarray and remove all zeros
    end

    def coldigits(col)
      result = []
      col.step(80, 9) {|i|                # loop from col by 9 up to 80
        v = @grid(i)
        result << value if (v != 0)
      }
      result
    end

    BoxOfIndex

    def boxdigits(b)
      # convert box number to index of upper-left corner of the box
      i = BoxOfIndex[b]

      # Return an array of values, with 0 elements removed
      [
        @grid[i],    @grid[i+1],  @grid[i+2],
        @grid[i+9],  @grid[i+10], @grid[i+11],
        @grid[i+18], @grid[i+19], @grid[i+20],
      ] - [0]
    end
  end # This is the end of the Puzzle class

  # An exception of this class indicates invalid input,
  class Invalid < StandardError
  end

  class Impossible < StandardError
  end

  def Sudoku.scan(puzzle)
    unchanged = false # This is our loop variable

    # Loop until we've scanned the whole board without making a change
    # TODO Ruby loop
    until unchanged
      unchanged = true        # Assume no cells will be changed this time, or we havn't made change yet
      rmin, cmin, pmin = nil  # Track cell with minimal possible set
      min = 10                # More than the maxmal number number of possibilities

      # Loop through cells whose value is unknown.
      puzzle.each_unknown do |row, col, box|
        # Find the set of values that could go in this cell
        p = puzzle.possible(row, col, box)

        # Because has multiple cases, p.size == 0, == 1 and else
        case p.size
        when 0
          raise Impossible, "Over constrained"
        when 1
          puzzle[row,col] = p[0]
          unchanged = false
        else
          # only if we havn't made change yet and size decreased
          if unchanged == true && p.size < min
            rmin, cmin, pmin = row, col, p      # row, col and set
            min = p.size
          end
        end
      end
    end

    # Return the cell with the minimal set of possibilities
    return rmin, cmin, pmin
  end

  def Sudoku.solve(puzzle)
    puzzle = puzzle.dup

    r,c,p = scan(puzzle)

    # If we solved it with logic, return the solved puzzle
    return puzzle if r == nil

    # Otherwise, try each of the values in p for cell [r,c]
    p.each do |guess|
      puzzle[r,c] = guess

      begin
        return solve(puzzle)  # If it returns, we just return the solution
      rescue Impossible
        next                  # If it raises an exception, try the next guess
      end
    end

    raise Impossible
  end
end



