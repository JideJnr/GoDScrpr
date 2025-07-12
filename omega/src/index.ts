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

import express from 'express';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

// Start bot logic
console.log('🚦 God Complex Bot booting...');
const subscriber = createClient({ url: process.env.REDIS_URL });
await subscriber.connect();

subscriber.subscribe('bot-control', (message) => {
  const { command } = JSON.parse(message);
  if (command === 'START_BOT') {
    console.log('🟢 Bot started by API command!');
    // runCourtroomService();
  } else if (command === 'STOP_BOT') {
    console.log('🔴 Bot stopped by API command!');
    // Stop logic if applicable
  }
});

// Minimal HTTP server just to keep service alive on Render
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('🧠 God Complex Bot is running'));
app.listen(PORT, () => {
  console.log(`🌐 Bot Web Service listening on port ${PORT}`);
});
