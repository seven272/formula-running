FROM node:22-alpine AS react-build

WORKDIR /app

EXPOSE 3010

COPY package.json /app

COPY package-lock.json /app

RUN npm install

COPY . /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

FROM nginx:stable-alpine
COPY --from=react-build /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 4010
CMD [ "nginx", "-g", "daemon off;" ]