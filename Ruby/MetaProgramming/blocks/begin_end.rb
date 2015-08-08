#!/usr/bin/ruby

# execute before main
#
#
BEGIN {
  # BEGIN block code
  puts "BEGIN code block 1"
}

BEGIN {
  # BEGIN block code
  puts "BEGIN code block 2"
}

BEGIN {
  # BEGIN block code
  puts "BEGIN code block 3"
}

# END block code execute after main in reverse order
#
#
END {
  # END block code
  puts "END code block 1"
}

END {
  # END block code
  puts "END code block 2"
}

END {
  # END block code
  puts "END code block 3"
}

# MAIN block code
puts "MAIN code block"
