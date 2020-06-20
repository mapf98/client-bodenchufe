FROM node:12

RUN npm install -g http-server

WORKDIR /CLIENT/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]