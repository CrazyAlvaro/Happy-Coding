#!/bin/sh
#   Work need to be done when setup a new Ubunt machine


########################################
#       System level
########################################

# Most information came from
# https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04#tutorial_series_32

# Add user
adduser yechen

# Add user to sudo group so that user can run 'sudo'
gpasswd -a yechen sudo

# Change SSH Port, optional to improve ssh security

#   Restrict Root login   /etc/ssh/sshd_config
#PermitRootLogin no
#   Reload SSH
service ssh restart


# Continue reading
# https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-ubuntu-14-04-servers

#   Configure basic Firewall
#   ## ENABLE ADDITIONAL PORT WHEN NEED ANOTHER SERVICE ##
sudo ufw allow ssh

# DO IT ONCE
sudo apt-get update

#   Configure Timezone
sudo dpkg-reconfigure tzdata

#   NTP Synchronization
sudo apt-get install -y ntp



########################################
# User level
########################################

# Install Git
sudo apt-get install -y git-core

# Configue Git
git config --global user.name "Yechen Huang"
git config --global user.email yechenhuang@gmail.com

# Install ZSH and Oh My ZSH
sudo apt-get install -y zsh
curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh

# Install Solarized for Ubuntu
sudo apt-get install -y dconf-cli
chsh -s /bin/zsh
