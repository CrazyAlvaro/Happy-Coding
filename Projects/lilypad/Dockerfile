FROM node:6

MAINTAINER zhenghe <zhenghe@madadata.com>

ENV HOME /opt/mada/lilypad

WORKDIR $HOME

COPY package.json npm-shrinkwrap.json $HOME/

RUN npm install

ADD . $HOME/

RUN npm run build && \
    npm prune --production && \
    npm cache clean

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
