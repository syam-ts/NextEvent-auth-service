FROM node:18

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

CMD ["node", "src/dist/app.js"]