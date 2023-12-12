FROM node:20-alpine
WORKDIR /spotify-clone/
COPY public/ /spotify-clone/public
COPY src/ /spotify-clone/src
COPY package.json /spotify-clone/

RUN npm install