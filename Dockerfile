FROM node:21.7.0-alpine 

WORKDIR /usr/src/app

#COPY . .
COPY package*.json ./
RUN npm install 
COPY . .

# ARG ci_build
ENV ci_build build-dev 

RUN mkdir -p /app/log

#CMD npm run ${ci_build}
RUN npm run build-dev

CMD npm start