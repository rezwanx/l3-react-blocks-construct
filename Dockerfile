FROM node:18.17.0-alpine

WORKDIR /usr/src/app

#COPY . .
COPY package*.json ./
RUN npm install 
COPY . .

<<<<<<< HEAD
# ARG ci_build
ENV ci_build build 

RUN mkdir -p /app/log

#CMD npm run ${ci_build}s
RUN npm run build
=======
ARG ci_build
# ENV ci_build $ci_build 

RUN mkdir -p /app/log

#CMD npm run ${ci_build}
RUN npm run build:${ci_build}
>>>>>>> 766308865e5fa2ff5ddfd0782ed7ded47edb956e

CMD npm start
