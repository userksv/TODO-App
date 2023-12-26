FROM node:16-alpine

# add working directory
WORKDIR /app/frontend/

# ENV PATH /app/frontend/node_modules/.bin:$PATH

COPY package.json /app/frontend/
COPY package-lock.json /app/frontend/
RUN npm install

# copy app files
COPY . /app/frontend/

RUN npm run build

EXPOSE 3000

# start app
CMD [ "npm", "start" ]