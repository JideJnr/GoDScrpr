"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const analyticsController_js_1 = require("../../../controllers/analyticsController.js");
const authMiddleware_js_1 = require("../../../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.get('/overview', authMiddleware_js_1.verifyJWT, analyticsController_js_1.getOverview);
router.get('/bookings-by-date', authMiddleware_js_1.verifyJWT, analyticsController_js_1.getBookingsByDate);
router.get('/revenue', authMiddleware_js_1.verifyJWT, analyticsController_js_1.getRevenue);
router.get('/top-rooms', authMiddleware_js_1.verifyJWT, analyticsController_js_1.getTopRooms);
router.get('/salary-expense', authMiddleware_js_1.verifyJWT, analyticsController_js_1.getSalaryExpense);
exports.default = router;
