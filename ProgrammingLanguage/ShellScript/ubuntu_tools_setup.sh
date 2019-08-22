#!/bin/sh

# Install Git
sudo apt-get install -y git-core
# Generate SSH Key for Github
# https://help.github.com/articles/generating-ssh-keys/

# Configue Git
git config --global user.name "Yechen Huang"
git config --global user.email yechenhuang@gmail.com

# Install ZSH and Oh My ZSH
sudo apt-get install -y zsh
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh


# Install Solarized for Ubuntu
sudo apt-get install -y dconf-cli
chsh -s /bin/zsh

# Install solarized
# https://github.com/Anthony25/gnome-terminal-colors-solarized

# Install xclip, like pbcopy/pbpaste
sudo apt-get install -y xclip

sudo apt-get install -y gcc g++ pkg-config

# Probably don't need these
# sudo apt-get install -y libperl-dev libgtk2.0-dev libxml2-dev libdbus-1-dev libdbus-glib-1-dev
# sudo apt-get install -y intltool liborbit2-dev
# # Install GNOME terminal
# sudo apt-get install gnome-terminal

# Vim pathogen
mkdir -p ~/.vim/autoload ~/.vim/bundle && \
curl -LSso ~/.vim/autoload/pathogen.vim https://tpo.pe/pathogen.vim

# Vundle
git clone https://github.com/gmarik/Vundle.vim.git ~/.vim/bundle/Vundle.vim

# slarized
cd ~/.vim/bundle
git clone git://github.com/altercation/vim-colors-solarized.git
