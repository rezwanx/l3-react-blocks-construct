FROM node:18.17.0-alpine

WORKDIR /usr/src/app

#COPY . .
COPY package*.json ./
RUN npm install 
COPY . .

# ARG ci_build
ENV ci_build build 

# Define additional environment variables 
ENV NODE_TLS_REJECT_UNAUTHORIZED=0 
ENV BACKEND_URL=https://dev-msblocks.seliselocal.com 
ENV X_BLOCKS_KEY=43b601404ea14615ad57d814e1c689ed

RUN mkdir -p /app/log

#CMD npm run ${ci_build}
RUN npm run build

CMD npm start