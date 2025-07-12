import { Router } from 'express';
import { createClient } from 'redis';

const router = Router();
const redisPub = createClient({ url: process.env.REDIS_URL });

redisPub.connect();

router.post('/bot-control', async (req, res) => {
  const { command } = req.body;

  if (!['START_BOT', 'STOP_BOT'].includes(command)) {
    return res.status(400).json({ error: 'Invalid command' });
  }

  await redisPub.publish('bot-control', JSON.stringify({ command }));

  res.json({ message: `🔁 Command ${command} sent to bots.` });
});

export default router;
