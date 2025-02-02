FROM node:18.17.0-alpine

WORKDIR /usr/src/app

#COPY . .
COPY package*.json ./
RUN npm install 
COPY . .

# ARG ci_build
ENV ci_build build 

RUN mkdir -p /app/log

#CMD npm run ${ci_build}s
RUN npm run build

CMD npm start