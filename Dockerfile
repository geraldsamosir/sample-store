FROM node:argon

ENV NODE_ENV sandbox

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app && npm install

# Bundle app source
COPY . /usr/src/app

RUN NODE_ENV=production npm run build

EXPOSE 8000
CMD [ "npm", "start" ]
