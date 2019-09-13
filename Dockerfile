FROM node:12

WORKDIR /opt

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-interactive

COPY lib ./lib
COPY express ./express

EXPOSE 8080
CMD [ "node", "express/app.js" ]
