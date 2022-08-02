FROM node:16.15.1

WORKDIR /opt/chatapp

COPY . .

RUN npm install --quiet

CMD ["node","/opt/chatapp/server/index.js"]