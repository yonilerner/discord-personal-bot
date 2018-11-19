#!/usr/bin/env bash
git pull
npm ci
npm run build

forever stop yoni-bot
rm $HOME/.forever/yoni-bot.log
forever start --uid "yoni-bot" $HOME/node/discord-personal-bot/build/server.js