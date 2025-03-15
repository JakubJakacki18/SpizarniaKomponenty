FROM node:22.14.0 AS build

WORKDIR /usr/src/app/Spizarnia-backend

COPY ../Spizarnia-backend/package.json ../Spizarnia-backend/package-lock.json ./

RUN npm install

COPY ../Spizarnia-backend/src/models/ ./src/models/

WORKDIR /usr/src/app/Spizarnia-react

COPY ../Spizarnia-react/package.json ../Spizarnia-react/package-lock.json ./

RUN npm install

COPY ../Spizarnia-react .

EXPOSE 3000

CMD ["npm", "start"]

