FROM node:19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "app.js" ]