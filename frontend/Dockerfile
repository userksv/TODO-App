FROM --platform="linux/amd64" node:alpine as build

WORKDIR /app/frontend/

COPY . /app/frontend

RUN npm install

CMD [ "npm", "run", "build" ]

FROM --platform="linux/amd64" nginx:alpine

# Copy the Nginx configuration file
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy additional static files or configurations if needed
COPY ./static /usr/share/nginx/html/static

# Copy the built assets from the previous stage
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Add any additional configurations you need
# For example, if you want to customize Nginx behavior further
# COPY ./nginx-custom.conf /etc/nginx/nginx.conf

# Expose the port Nginx will be listening on (default is 80)
EXPOSE 80

# CMD is not needed here as it will use the default CMD from the nginx:alpine image
