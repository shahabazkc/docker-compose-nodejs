FROM node:alpine
# Create app directory
#RUN mkdir -p /usr/src/app
WORKDIR /user/src/app
COPY package.json .
RUN npm install
COPY . .
CMD [ "npm", "start"]