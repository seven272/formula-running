FROM node:22-alpine

WORKDIR /app

EXPOSE 5010

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD [ "npm", "run", "start" ]