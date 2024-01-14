FROM --platform="linux/amd64" node:18.12.1-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

COPY . .
RUN npm install
RUN npm run build

FROM --platform="linux/amd64" nginx:1.23.2-alpine

RUN rm -f /ect/nginx/conf.d/default.conf

COPY ./.nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]