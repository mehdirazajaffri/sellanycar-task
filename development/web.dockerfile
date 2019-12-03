FROM nginx:1.10-alpine

ADD development/vhost.conf /etc/nginx/conf.d/default.conf

COPY . /var/www
COPY public /var/www/public
