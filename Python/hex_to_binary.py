#!/usr/bin/python

print("convert from hex to binary")

hex_str = raw_input('input hex value as string: ')
scale = 16 # equals to hexadecimal

num_of_bits = 8

print bin(int(hex_str, scale))[2:].zfill(num_of_bits)
