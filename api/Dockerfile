FROM alpine:3.16 
RUN apk add --update --no-cache nodejs npm 
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install 
RUN npm run build 
CMD ["npm","start"]
