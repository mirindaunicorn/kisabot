FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./
RUN  apt-get update  \
     && apt-get install -y sqlite3 libsqlite3-dev  \
     && cd /usr/src/app \
     && touch databse.db \
     && chmod 770 databse.db

RUN npm install

COPY . .

CMD ["sh", "-c", "node createDatabase.js && node scheduler.js && npm start"]

