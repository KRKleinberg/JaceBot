FROM node:lts-bookworm-slim

COPY package.json /app/

WORKDIR /app/

RUN \
  apt-get update && \
  apt-get install -y curl && \
  apt-get install -y ffmpeg

RUN npm install

COPY . .

RUN npm run build

# Start the bot.
CMD ["npm", "start"]
