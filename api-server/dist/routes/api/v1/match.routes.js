"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const match_controller_js_1 = require("../../../controllers/match.controller.js");
const authMiddleware_js_1 = require("../../../middleware/authMiddleware.js");
const router = express_1.default.Router();
router.get('/match/date', authMiddleware_js_1.verifyJWT, match_controller_js_1.getAllMatchesByDate);
router.get('/match/live', authMiddleware_js_1.verifyJWT, match_controller_js_1.getAllLiveMatches);
router.get('/match/id', authMiddleware_js_1.verifyJWT, match_controller_js_1.getMatchById);
router.get('/verdict/:matchId', authMiddleware_js_1.verifyJWT, match_controller_js_1.getMatchVerdicts);
exports.default = router;
