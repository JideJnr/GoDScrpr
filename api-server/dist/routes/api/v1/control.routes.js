"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const redis_1 = require("redis");
const router = (0, express_1.Router)();
const redisPub = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
redisPub.connect();
router.post('/bot-control', async (req, res) => {
    const { command } = req.body;
    if (!['START_BOT', 'STOP_BOT'].includes(command)) {
        return res.status(400).json({ error: 'Invalid command' });
    }
    await redisPub.publish('bot-control', JSON.stringify({ command }));
    res.json({ message: `🔁 Command ${command} sent to bots.` });
});
exports.default = router;
