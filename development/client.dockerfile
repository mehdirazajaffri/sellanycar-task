# base image
FROM node:12.2.0-alpine

COPY . /app
# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm rebuild node-sass

# start app
CMD ["npm", "start"]
