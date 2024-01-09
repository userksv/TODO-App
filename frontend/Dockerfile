FROM --platform="linux/amd64" node:18.12.1-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./

COPY . .
RUN npm install
RUN npm run build

FROM --platform="linux/amd64" nginx:1.23.2-alpine

COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]