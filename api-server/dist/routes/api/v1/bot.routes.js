"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bot_controller_1 = require("../../../controllers/bot.controller");
const authMiddleware_js_1 = require("../../../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.post('/enable', authMiddleware_js_1.verifyJWT, bot_controller_1.enableBot);
router.post('/disable', authMiddleware_js_1.verifyJWT, bot_controller_1.disableBot);
router.get('/status', authMiddleware_js_1.verifyJWT, bot_controller_1.getStatus);
router.post('/heartbeat', authMiddleware_js_1.verifyJWT, bot_controller_1.heartbeat);
exports.default = router;
