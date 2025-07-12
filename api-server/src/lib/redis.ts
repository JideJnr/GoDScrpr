// src/lib/redis.ts
import { createClient } from 'redis';

const redisPublisher = createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
});

redisPublisher.connect().catch(console.error);

export const publishBotCommand = async (command: string, payload: Record<string, any> = {}) => {
  const message = JSON.stringify({ command, payload });
  await redisPublisher.publish('bot-control', message);
};
