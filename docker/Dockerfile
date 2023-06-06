FROM node:16.20-alpine as builder

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.25
COPY --from=builder /app/build /app/www
COPY --from=builder /app/etc/nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]
