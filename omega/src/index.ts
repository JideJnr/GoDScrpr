import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

console.log('🚦 System initialized...');
console.log('🚦 Welcome Back !!! ');
console.log('🚦 Standing by for your commands...');

const subscriber = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
await subscriber.connect();

subscriber.subscribe('bot-control', (message) => {
  const { command } = JSON.parse(message);
  if (command === 'START_BOT') {
    console.log('🟢 Bot started by API command!');
  } else if (command === 'STOP_BOT') {
    console.log('🔴 Bot stopped by API command!');
  }
});
