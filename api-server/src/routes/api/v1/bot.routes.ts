import express from 'express';
import { 
  enableBot, 
  disableBot, 
  getStatus,
  heartbeat
} from '../../../controllers/bot.controller';
import { verifyJWT } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/enable', verifyJWT, enableBot);
router.post('/disable', verifyJWT, disableBot);
router.get('/status', verifyJWT, getStatus);
router.post('/heartbeat', verifyJWT , heartbeat);


export default router;