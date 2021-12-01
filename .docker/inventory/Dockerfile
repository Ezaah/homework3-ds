FROM node:17

ENV NODE_ENV development

WORKDIR /usr/src/inventory

COPY inventory/package.json ./
COPY inventory/package-lock.json ./
RUN npm install
COPY inventory .

EXPOSE 8000
USER node

CMD [ "npm", "start" ]