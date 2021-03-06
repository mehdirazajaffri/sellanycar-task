FROM php:7.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get -y install git && apt-get -y install zip && apt-get -y install nano

COPY . /var/www

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "if (hash_file('SHA384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" \
    && php composer-setup.php \
    && php -r "unlink('composer-setup.php');" \
    && php composer.phar install

RUN chown -R www-data:www-data \
    /var/www/storage \
    /var/www/bootstrap/cache

RUN  apt-get install -y libmcrypt-dev \
    libmagickwand-dev --no-install-recommends \
    && pecl install mcrypt-1.0.2 \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable mcrypt

RUN mv .env.example .env
