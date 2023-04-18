FROM node:14-alpine as portfolioBuild
WORKDIR /react
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
