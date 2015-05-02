#!/usr/bin/python

# Python Doc
# https://docs.python.org/2/library/binascii.html#binascii.unhexlify

import binascii
#Convertion from text to 
print ("Encode string to ASCII as binary")

message = raw_input("Enter message to encode: ")

encoded_binary = ""
for char in message:
    encoded_binary += hex(ord(char))[2:]

print encoded_binary


