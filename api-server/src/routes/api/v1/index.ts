import express from 'express';
import authRoutes from './auth.routes.js';
import activityRoutes from './activity.routes.js';
import analyticRoutes from './activity.routes.js';
import botRoutes from './bot.routes.js';
import matchRoutes from './match.routes.js';
import predictionRoutes from './prediction.routes.js';
import controlRoutes from './control.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/activities', activityRoutes);
router.use('/analytics', analyticRoutes);
router.use('/bot', botRoutes);
router.use('/control', controlRoutes);
router.use('/match', matchRoutes);
router.use('/prediction', predictionRoutes);

export default router;
