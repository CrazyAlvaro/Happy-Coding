#!/usr/local/bin/ruby

##########################################################################################
#
#   Read All csv file and concatenate to one file 'tmp/test.csv'
#   Igonore every file's first line
#
##########################################################################################

TARGET_DIR = "tmp"
TARGET_FILE = "combined.csv"
FILE_TYPE = "./*.csv"
FIRST_LINE = "date,author,author_link,message,message_link,sentiment\n"

# Target directory
Dir.mkdir TARGET_DIR unless File.exists?(TARGET_DIR)

# Target file
target_file = TARGET_DIR + '/' + TARGET_FILE
File.truncate(target_file, 0) if File.exists?(target_file)    # Clear content

# Write the first line
open(target_file, 'a') do |file|
  file << FIRST_LINE
end

# Get all type of specific files in current folder
files = Dir.glob(FILE_TYPE)
for file in files
  #puts "Got #{file}"
  file = File.open(file)
  content = ""
  file.each { |line|
    if line.start_with?(FIRST_LINE) then
      next
    end
    content << line
  }

  open(target_file, 'a') do |file|
    file << content
  end

end

puts "Write all #{FILE_TYPE} to file: #{TARGET_DIR}/#{TARGET_FILE}"
