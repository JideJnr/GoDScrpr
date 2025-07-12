"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsOverview = void 0;
const errorHandler_js_1 = require("../utils/errorHandler.js");
const getAnalyticsOverview = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_js_1.errorHandler)(error, req, res);
    }
};
exports.getAnalyticsOverview = getAnalyticsOverview;
