#!/bin/sh
ansible-playbook -i ./inventory --ask-vault-pass --ask-pass -K ./main.yml
