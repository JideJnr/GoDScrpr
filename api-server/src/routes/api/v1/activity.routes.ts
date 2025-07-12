import express from 'express';
import { verifyJWT } from '../../../middleware/authMiddleware.js';
import { getUserActivities, updateActivity } from '../../../controllers/activity.controller.js';

const router = express.Router();

router.get('/:uid', verifyJWT, getUserActivities);
router.put('/:id', verifyJWT, updateActivity);

export default router;
