FROM node:16

# Create app directory
WORKDIR /usr/src/app

RUN apt-get update &&  \
    apt-get install -y libnss3-dev libgdk-pixbuf2.0-dev libgtk-3-dev libxss-dev libasound2

COPY src/package*.json ./

RUN npm install

COPY src .

EXPOSE 8080
CMD [ "node", "server.js" ]
