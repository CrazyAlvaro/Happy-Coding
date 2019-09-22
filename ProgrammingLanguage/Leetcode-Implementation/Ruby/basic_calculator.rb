#  Implement a basic calculator to evaluate a simple expression string.
#
#  The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .
#
#  You may assume that the given expression is always valid.
#
#  Some examples:
#  "1 + 1" = 2
#  " 2-1 + 2 " = 3
#  "(1+(4+5+2)-3)+(6+8)" = 23



# One way to evaludate an expression is to use a Recursive Descent Parser
#
#  Expr ::= Term ('+' Term | '-' Term)*
#
#  Term ::= Factor ('*' Factor | '/' Factor)*
#
#  Factor ::= ['-'] (Number | '(' Expr ')')
#
#  Number ::= Digit+



#  Convert infix to reverse polish notation is faily simply and then evaluate reverse polish notation
#  Shunting-yard algorithm

def tokenizer(str)
  str.delete!(' ')    # remove all whitespace
  index, tokens =0, []
  while index < str.length
    case str[index]
    when '(', ')', '+', '-', '*', '/'
      tokens.push(str[index])
      index += 1
    when '0'..'9'
      num = 0
      while index < str.length and str[index] =~ /[0-9]/
        num = num*10
        num += str[index].to_i
        index += 1
      end
      tokens.push(num)
    end
  end
  return tokens
end

# Implementation of Shunting-yard algorithm
def infix_to_reverse_polish(tokens)
  # We use a stack
  # When an operand is read, output it
  # When an operator is read
  #  -  Pop until the top of the stack has an element of lower precedence
  #  -  Then push it
  # When ) is found, pop until we find the matching (
  # ( has the lowest precedence when in the stack
  # but has the highest precedence when in the input
  # When we reach the end of input, pop until the stack is empty

  operator_stack, output= [], []
  for token in tokens

    if token.is_a? Integer
      output.push(token)
    elsif token == ')'
      while operator_stack.last != '('
        output.push(operator_stack.pop)
      end
      operator_stack.pop  # remove matching '('
    elsif token == '('
      operator_stack.push(token)
    elsif token == '+' or token == '-'
      while operator_stack.last != '(' and operator_stack.length > 0
        output.push(operator_stack.pop)
      end
      operator_stack.push(token)
    elsif token == '*' or token == '/'
      while operator_stack.last == '*' or operator_stack.last == '/'
        output.push(operator_stack.pop)
      end
      operator_stack.push(token)
    else
      raise "Syntax error with token #{token} at #{tokens.inspect}"
    end

  end

  while operator_stack.size > 0
    output.push(operator_stack.pop)
  end

  return output
end

def evaluate_reverse_polish(reverse_tokens)
  stack = []
  for token in reverse_tokens
    if token.is_a? Integer
      stack.push(token)
    elsif
      # is an operator
      second = stack.pop
      first = stack.pop
      case token
      when '+'
        stack.push(first + second)
      when '-'
        stack.push(first - second)
      when '*'
        stack.push(first * second)
      when '/'
        stack.push((first / second).to_i)
      end
    end
  end
  return stack[0]
end

# @param {String} s
# @return {Integer}
def calculate(s)
  # the given expression is always valid
  tokens = tokenizer(s)
  puts "tokens is #{tokens}"
  reverse_notation = infix_to_reverse_polish(tokens)
  puts "reverse notation: #{reverse_notation}"
  return evaluate_reverse_polish(reverse_notation)
end

puts calculate("2-1+3")
#puts calculate("(22- 91*4) * (12 + 2)")
