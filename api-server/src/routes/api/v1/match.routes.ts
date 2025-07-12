import express from 'express';
import { 
  getAllMatchesByDate, 
  getAllLiveMatches, 
  getMatchById,getMatchVerdicts
} from '../../../controllers/match.controller.js';
import { verifyJWT } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/match/date', verifyJWT, getAllMatchesByDate);
router.get('/match/live', verifyJWT, getAllLiveMatches);
router.get('/match/id', verifyJWT, getMatchById);
router.get('/verdict/:matchId',verifyJWT, getMatchVerdicts);



export default router;