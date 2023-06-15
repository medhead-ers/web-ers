# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
RUN apk add python3 make g++
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./ngnix.default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# Copy entrypoint script as /entrypoint.sh
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]