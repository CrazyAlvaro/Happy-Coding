#!/bin/sh

########################################
# Find files by patter
# -E dont need to escape bracket
########################################
find -E . -regex ".*\.(h|cpp)" > cpp_files.log


########################################
# Rename file match by pattern
########################################
for file in client.*;
do
    mv "$file"  "`echo $file | sed s/^client.//`";
done

########################################
# Remove trailing whitespace
########################################
sed -i 's/[[:space:]]*$//' $1


########################################
# Integrat find with sed
########################################

## method 1 with -exec
find . -type f -name '*.txt' -exec sed --in-place 's/[[:space:]]\+$//' {} \+

## method 2 with xargs
find . -type f -print0 | xargs -0 sed -i '' -E "s/[[:space:]]*$//"

## actually command works for me
find -E . -type f -regex ".*\.(h|cpp)"  -print0 | xargs -0 sed -i '' -E "s/[[:space:]]*$//"
