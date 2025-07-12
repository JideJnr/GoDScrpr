"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllFailedPredictions = exports.getAllSuccessfulPredictions = exports.getAllActivePredictions = exports.getMatchPredictions = exports.getAllPredictions = exports.predictionsOverview = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const predictionsOverview = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.predictionsOverview = predictionsOverview;
const getAllPredictions = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.getAllPredictions = getAllPredictions;
const getMatchPredictions = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.getMatchPredictions = getMatchPredictions;
const getAllActivePredictions = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.getAllActivePredictions = getAllActivePredictions;
const getAllSuccessfulPredictions = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.getAllSuccessfulPredictions = getAllSuccessfulPredictions;
const getAllFailedPredictions = async (req, res) => {
    try {
        const { uid, role } = req.user;
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.getAllFailedPredictions = getAllFailedPredictions;
