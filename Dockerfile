# pull official base image
FROM node:16.11.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn config set unsafe-perm true
RUN yarn
RUN yarn global add react-scripts


# add app
COPY . ./

RUN chown -R node /app/node_modules

USER node

# start app
CMD ["npm", "start"]
