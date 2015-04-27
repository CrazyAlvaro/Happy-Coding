#!/bin/bash

apt-get install smartmontools

visudo -f /etc/sudoers.d/SMARTCTL

smartctl -i /dev/sda

lsb_release -a
