# pull official base image
FROM node:18-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN rm -rf node_modules && yarn install --frozen-lockfile
RUN yarn global add react-scripts

COPY . ./
RUN yarn build


# production environment
# FROM nginx:stable-alpine

# # Set up Nginx config and remove default files
# RUN rm -rf /usr/share/nginx/html/*
# RUN rm /etc/nginx/conf.d/default.conf
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy Application
# COPY --from=build /app/build /usr/share/nginx/html


# Expose HTTP and HTTPS ports
EXPOSE 3000
