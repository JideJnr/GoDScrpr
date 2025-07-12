"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMatchVerdicts = exports.getAllTeamsByFilter = exports.getPlayerById = exports.getAllPlayers = exports.getTeamById = exports.getAllTeams = exports.getLeagueById = exports.getAllLeagues = exports.getMatchById = exports.getAllLiveMatches = exports.getAllMatchesByDate = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const getAllMatchesByDate = async (req, res) => {
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
exports.getAllMatchesByDate = getAllMatchesByDate;
const getAllLiveMatches = async (req, res) => {
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
exports.getAllLiveMatches = getAllLiveMatches;
const getMatchById = async (req, res) => {
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
exports.getMatchById = getMatchById;
const getAllLeagues = async (req, res) => {
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
exports.getAllLeagues = getAllLeagues;
const getLeagueById = async (req, res) => {
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
exports.getLeagueById = getLeagueById;
const getAllTeams = async (req, res) => {
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
exports.getAllTeams = getAllTeams;
const getTeamById = async (req, res) => {
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
exports.getTeamById = getTeamById;
const getAllPlayers = async (req, res) => {
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
exports.getAllPlayers = getAllPlayers;
const getPlayerById = async (req, res) => {
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
exports.getPlayerById = getPlayerById;
const getAllTeamsByFilter = async (req, res) => {
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
exports.getAllTeamsByFilter = getAllTeamsByFilter;
const getMatchVerdicts = async (req, res) => {
    try {
        const { uid, role } = req.user;
        // Fetch match verdicts using GodComplex
        const matchVerdicts = await god.getMatchVerdicts();
        res.status(200).json({
            success: true,
            data: matchVerdicts
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)(error, req, res);
    }
};
exports.getMatchVerdicts = getMatchVerdicts;
