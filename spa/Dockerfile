FROM alpine:3.16 
RUN apk add --update --no-cache nodejs npm 
RUN mkdir -p /app
COPY . /app
WORKDIR /app
## CMD ["npm","install --force"]
RUN npm install --force
RUN npm run build 
CMD ["npm","start"]
