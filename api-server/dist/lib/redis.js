"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishBotCommand = void 0;
// src/lib/redis.ts
const redis_1 = require("redis");
const redisPublisher = (0, redis_1.createClient)({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
});
redisPublisher.connect().catch(console.error);
const publishBotCommand = async (command, payload = {}) => {
    const message = JSON.stringify({ command, payload });
    await redisPublisher.publish('bot-control', message);
};
exports.publishBotCommand = publishBotCommand;
