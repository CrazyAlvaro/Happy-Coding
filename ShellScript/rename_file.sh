#!/bin/sh
#
#   Rename file match by pattern
#

for file in client.*;
do 
    mv "$file"  "`echo $file | sed s/^client.//`";
done
