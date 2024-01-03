FROM node:alpine 

# add working directory
WORKDIR /app/frontend/

COPY . /app/frontend
# ENV PATH /app/frontend/node_modules/.bin:$PATH

# Copy package.json and package-lock.json to the working directory
# COPY ./package.json /app/frontend/
# COPY ./package-lock.json /app/frontend/

RUN npm install

CMD [ "npm", "run", "build" ]