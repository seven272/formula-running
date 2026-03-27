FROM nginx:stable-alpine

# Копирую готовую сборку из папки dist, которую приылаю через Git
COPY ./dist /usr/share/nginx/html

# Копируем конфиг Nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 4010

CMD ["nginx", "-g", "daemon off;"]
