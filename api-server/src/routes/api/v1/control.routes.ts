import { Router } from 'express';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
const router = Router();

const redisPub = createClient({ url: process.env.REDIS_URL });
redisPub.connect();

/**
 * @openapi
 * /bot-control:
 *   post:
 *     summary: Start or stop the prediction bot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               command:
 *                 type: string
 *                 enum: [START_BOT, STOP_BOT]
 *                 example: START_BOT
 *     responses:
 *       200:
 *         description: Command sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid command
 */
router.post('/bot-control', async (req, res) => {
  const { command } = req.body;

  if (!['START_BOT', 'STOP_BOT'].includes(command)) {
    return res.status(400).json({ error: 'Invalid command' });
  }

  await redisPub.publish('bot-control', JSON.stringify({ command }));
  return res.json({ message: `🔁 Command ${command} sent to bots.` });
});

export default router;
