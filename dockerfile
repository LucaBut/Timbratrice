# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /application

# add `/app/node_modules/.bin` to $PATH
ENV PATH /application/node_modules/.bin:$PATH

# install app dependencies

COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]