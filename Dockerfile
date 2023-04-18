FROM node:14-alpine as portfolioBuild
WORKDIR /react-portfolio
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#Nginx Block
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=portfolioBuild /react-portfolio/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]