FROM node:22.14.0 AS build

WORKDIR /usr/src/app/Spizarnia

#COPY ../Spizarnia-backend/src/models ./Spizarnia-backend/src/models/
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# RUN npm start

EXPOSE 4200

CMD ["npm", "start"]