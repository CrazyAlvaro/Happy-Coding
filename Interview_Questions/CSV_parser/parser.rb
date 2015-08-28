#
# CSV parsesr of ruby
#
#   output is an Array of Array
class Parser
  def initialize(body)
    @body = body
  end

  def parse
    result = Array.new
    @body.each do |line|
      line_str = line.join(',')
      puts "\nParse new line: #{line_str}"
      result.push( parse_line(line_str) )
      puts 'Current line result:  ', result[result.size - 1]
    end
    result
  end

  def reset_pos
    @position = 0
  end

  def increment_pos(num)
    @position += num
  end

  def enter_double(line)
    token = ""
    increment_pos(1)
    while @position < line.length
      case line[@position]
      when '"'
        if @position + 1 < line.length and line[@position + 1] == '"'
          token += '"'
          increment_pos(2)
        elsif  @position + 1 == line.length or line[@position + 1] != '"'
          increment_pos(1)
          #puts "Return token #{token}"
          return token
        else
        end
      else
        token += line[@position]
        increment_pos(1)
      end
    end

    raise "Invalid CSV for line: #{line}"
  end

  # parse a line
  def parse_line(line)
    @position = 0
    token = ""
    token_array = Array.new
    while  @position < line.length
      case line[@position]
      when ','
        token_array.push(token)
        token = ""
        increment_pos(1)
      when ' '
        increment_pos(1)
      when '"'
        raise "Invalid CSV for line: #{line} at position: #{@position} current token is #{token}" if token != ""
        token = enter_double(line)
        #token_array.push(token)
        #puts "after enter_double #{@position} #{line[@position]} token #{token}"
      else
        token = token + line[@position]
        increment_pos(1)
      end
    end # end while
    token_array.push(token) # push the last token

    token_array
  end
end


if __FILE__ == $0
  CSV = [ ['Year,Make,Model,Description,Price'],
          ['1997,Ford,E350,"ac, abs, moon",3000.00'],
          ['1999,Chevy,"Venture ""Extended Edition""","",4900.00'],
          ['1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00'],
          ['1996,Jeep,Grand Cherokee,"MUST SELL! air, moon roof, loaded",4799.00']]

  test_inst = Parser.new(CSV)
  result = test_inst.parse
  #result.each do |line|
  #  puts line
  #end
end
