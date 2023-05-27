FROM node:16.20-alpine
RUN apk add --update --no-cache bash
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod
EXPOSE 4200
CMD ["node_modules/.bin/ng", "serve","--host=0.0.0.0","--disable-host-check"]
