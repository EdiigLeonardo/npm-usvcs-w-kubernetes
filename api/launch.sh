#!/bin/sh
rm -rf node_modules/
find . -name "*.js" | xargs -i rm {}
find . -name "*.js.map" | xargs -i rm {}
npm install
npm run build
npm start
