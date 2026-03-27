FROM nginx:stable-alpine

# Удаляем стандартный дефолтный конфиг!
RUN rm /etc/nginx/conf.d/default.conf

# Копирую готовую сборку из папки dist, которую приылаю через Git
COPY ./dist /usr/share/nginx/html

# Копируем конфиг Nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 4010

CMD ["nginx", "-g", "daemon off;"]
