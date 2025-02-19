FROM node:22.14.0 AS build

WORKDIR /usr/src/app/Spizarnia-backend 

COPY package.json package-lock.json ./
RUN npm install

COPY . .
# RUN npm start

EXPOSE 5000

CMD ["npm", "start"]