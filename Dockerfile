FROM node:14-alpine
WORKDIR /react
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
