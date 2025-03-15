FROM node:22.14.0 AS build

RUN apt-get update && apt-get install -y gettext

WORKDIR /usr/src/app/Spizarnia-backend

COPY ../Spizarnia-backend/package.json ../Spizarnia-backend/package-lock.json ./

RUN npm install

COPY ../Spizarnia-backend/src/models/ ./src/models/

WORKDIR /usr/src/app/Spizarnia

COPY ../Spizarnia/package.json ../Spizarnia/package-lock.json ./

RUN npm install -g @angular/cli

RUN npm install

COPY ../Spizarnia .

RUN chmod +x entrypoint.sh

EXPOSE 4200

ENTRYPOINT ["./entrypoint.sh"]
CMD ["ng", "serve", "--host", "0.0.0.0"]
