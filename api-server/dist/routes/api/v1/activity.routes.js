"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../../../middleware/authMiddleware.js");
const activity_controller_js_1 = require("../../../controllers/activity.controller.js");
const router = express_1.default.Router();
router.get('/:uid', authMiddleware_js_1.verifyJWT, activity_controller_js_1.getUserActivities);
router.put('/:id', authMiddleware_js_1.verifyJWT, activity_controller_js_1.updateActivity);
exports.default = router;
