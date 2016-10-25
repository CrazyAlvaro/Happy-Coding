FROM node:5.11

MAINTAINER Madadata <hi@madadata.com>

ENV API_HOST postgrest
ENV API_PORT 3001
ENV MONGODB_HOST mongo
ENV MONGODB_PORT 27017
ENV MONGODB_DB ant_blade_auth
ENV SESSION_SECRET 4d748bb898e7cbd78210e29536f4c1f1

ENV HOME /home/ant-blade
WORKDIR $HOME

COPY package.json npm-shrinkwrap.json $HOME/

RUN npm install

ADD . $HOME/
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "run:prod"]
