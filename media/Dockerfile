FROM keymetrics/pm2:8-alpine

ADD . ./app
WORKDIR /app

EXPOSE 5000

ENTRYPOINT ['pm2', 'start', 'index_media.js']