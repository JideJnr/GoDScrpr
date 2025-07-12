import express from 'express';
import {
  getOverview,
  getBookingsByDate,
  getRevenue,
  getTopRooms,
  getSalaryExpense
} from '../../../controllers/analyticsController.js';
import { verifyJWT } from '../../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/overview', verifyJWT, getOverview);
router.get('/bookings-by-date', verifyJWT, getBookingsByDate);
router.get('/revenue', verifyJWT, getRevenue);
router.get('/top-rooms', verifyJWT, getTopRooms);
router.get('/salary-expense', verifyJWT, getSalaryExpense);

export default router;
