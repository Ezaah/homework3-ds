FROM node:17

ENV NODE_ENV development

WORKDIR /usr/src/inventory

COPY inventory .
RUN npm install

EXPOSE 8000
USER node

CMD [ "npm", "start" ]