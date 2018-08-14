FROM node:10-alpine as frontendbuilder

RUN apk --update add git bash curl tar \
  && rm -rf /var/cache/apk/* \
  && touch ~/.bashrc \
  && curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 0.22.0
ENV NPM_CONFIG_LOGLEVEL=warn \
    PATH=/root/.yarn/bin:${PATH}

ADD . ./app
WORKDIR /app
RUN yarn install --ignore-engines
ENV NODE_ENV=production
RUN yarn build


FROM keymetrics/pm2:8-alpine

COPY --from=frontendbuilder /app/build/index.html ./app/
COPY --from=frontendbuilder /app/build/hero.jpg ./app/
COPY --from=frontendbuilder /app/build/hero2.jpg ./app/
COPY --from=frontendbuilder /app/build/home.jpg ./app/
COPY --from=frontendbuilder /app/build/home2.jpg ./app/
COPY --from=frontendbuilder /app/build/logo.png ./app/
COPY --from=frontendbuilder /app/build/service-worker.js ./app/
COPY --from=frontendbuilder /app/build/asset-manifest.json ./app/
COPY --from=frontendbuilder /app/build/static/js/* ./app/static/js/
COPY --from=frontendbuilder /app/build/static/css/* ./app/static/css/
COPY --from=frontendbuilder /app/build/static/media/* ./app/static/media/
COPY --from=frontendbuilder /app/index_react.js/* ./app/

WORKDIR /app

EXPOSE 8080

ENTRYPOINT ['pm2', 'start', 'index_react.js']