FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app/spotify-clone-front

COPY package.json .

RUN npm install
COPY . .

RUN npm run build

FROM node:20-alpine as PRODUCTION_IMAGE
WORKDIR /app/spotify-clone-front

COPY --from=BUILD_IMAGE /app/spotify-clone-front/dist/ /app/spotify-clone-front/dist/

COPY package.json .
COPY vite.config.ts .

EXPOSE 5173

RUN npm install typescript

CMD ["npm", "run", "preview"]
