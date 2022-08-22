FROM        node:latest-alpine
WORKDIR     /app
ENV         PORT 3000
ENV         NODE_ENV Docker
VOLUME      . /app
EXPOSE      3000
ENTRYPOINT  npm start