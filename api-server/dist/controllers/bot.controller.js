"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBotNotifications = exports.getBotAlerts = exports.getBotHealth = exports.getBotPerformance = exports.getBotMetrics = exports.updateBotConfig = exports.getBotConfig = exports.clearConsoleOutput = exports.clearBotLogs = exports.getConsoleOutput = exports.getBotLogs = exports.getBotStatus = exports.resetBot = exports.heartbeat = exports.getStatus = exports.disableBot = exports.enableBot = void 0;
const redis_1 = require("../lib/redis");
// In-memory store (replace with DB in production)
const botStatus = {
    helper: { running: false, lastHeartbeat: null },
    analysis: { running: false, lastHeartbeat: null }
};
const enableBot = async (req, res) => {
    try {
        await (0, redis_1.publishBotCommand)('START_BOT', { botName: req.body.botName });
        return res.json({ message: 'Bot start command sent.' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to send start command.', error: err.message });
    }
};
exports.enableBot = enableBot;
const disableBot = async (req, res) => {
    try {
        await (0, redis_1.publishBotCommand)('STOP_BOT', { botName: req.body.botName });
        return res.json({ message: 'Bot stop command sent.' });
    }
    catch (err) {
        return res.status(500).json({ message: 'Failed to send stop command.', error: err.message });
    }
};
exports.disableBot = disableBot;
const getStatus = (req, res) => {
    res.json({
        bots: [
            {
                type: "helper",
                status: botStatus.helper.running ? "running" : "stopped",
                last_heartbeat: botStatus.helper.lastHeartbeat?.toISOString() || null
            },
            {
                type: "analysis",
                status: botStatus.analysis.running ? "running" : "stopped",
                last_heartbeat: botStatus.analysis.lastHeartbeat?.toISOString() || null
            }
        ]
    });
};
exports.getStatus = getStatus;
const heartbeat = (req, res) => {
    const { bot_type } = req.body;
    if (!['helper', 'analysis'].includes(bot_type)) {
        return res.status(400).json({ error: "Invalid bot_type" });
    }
    if (!botStatus[bot_type].running) {
        return res.status(409).json({ error: `${bot_type} bot is not running` });
    }
    // Update last heartbeat
    botStatus[bot_type].lastHeartbeat = new Date();
    res.json({
        status: "success",
        bot_type,
        last_heartbeat: botStatus[bot_type].lastHeartbeat.toISOString()
    });
};
exports.heartbeat = heartbeat;
const resetBot = (req, res) => {
    const { bot_type } = req.body;
    if (!['helper', 'analysis'].includes(bot_type)) {
        return res.status(400).json({ error: "Invalid bot_type" });
    }
    // Reset bot status
    botStatus[bot_type] = {
        running: false,
        lastHeartbeat: null
    };
    res.json({
        status: "success",
        bot_type,
        action: "reset",
        timestamp: new Date().toISOString()
    });
};
exports.resetBot = resetBot;
const getBotStatus = (req, res) => {
    const { bot_type } = req.query;
    if (bot_type && !['helper', 'analysis'].includes(bot_type)) {
        return res.status(400).json({ error: "Invalid bot_type" });
    }
    if (bot_type) {
        const status = botStatus[bot_type];
        return res.json({
            type: bot_type,
            status: status.running ? "running" : "stopped",
            last_heartbeat: status.lastHeartbeat?.toISOString() || null
        });
    }
    // Return all bot statuses
    res.json(botStatus);
};
exports.getBotStatus = getBotStatus;
const getBotLogs = (req, res) => {
    // Placeholder for bot logs
    // In a real application, you would fetch logs from a database or log service
    const logs = [
        { timestamp: new Date().toISOString(), message: "Bot started" },
        { timestamp: new Date().toISOString(), message: "Heartbeat received" }
    ];
    res.json({ logs });
};
exports.getBotLogs = getBotLogs;
const getConsoleOutput = (req, res) => {
    // Placeholder for console output
    // In a real application, you would fetch console output from a logging service
    const consoleOutput = [
        { timestamp: new Date().toISOString(), message: "Bot initialized" },
        { timestamp: new Date().toISOString(), message: "Action performed" }
    ];
    res.json({ consoleOutput });
};
exports.getConsoleOutput = getConsoleOutput;
const clearBotLogs = (req, res) => {
    // Placeholder for clearing logs
    // In a real application, you would clear logs from a database or log service
    res.json({ status: "success", message: "Bot logs cleared" });
};
exports.clearBotLogs = clearBotLogs;
const clearConsoleOutput = (req, res) => {
    // Placeholder for clearing console output
    // In a real application, you would clear console output from a logging service
    res.json({ status: "success", message: "Console output cleared" });
};
exports.clearConsoleOutput = clearConsoleOutput;
const getBotConfig = (req, res) => {
    // Placeholder for bot configuration
    // In a real application, you would fetch configuration from a database or config service
    const config = {
        helper: { enabled: true, interval: 60000 },
        analysis: { enabled: false, interval: 300000 }
    };
    res.json({ config });
};
exports.getBotConfig = getBotConfig;
const updateBotConfig = (req, res) => {
    const { bot_type, config } = req.body;
    if (!['helper', 'analysis'].includes(bot_type)) {
        return res.status(400).json({ error: "Invalid bot_type" });
    }
    // Update bot configuration (in-memory for this example)
    // In a real application, you would save this to a database or config service
    botStatus[bot_type] = { ...botStatus[bot_type], ...config };
    res.json({
        status: "success",
        bot_type,
        updated_config: botStatus[bot_type]
    });
};
exports.updateBotConfig = updateBotConfig;
const getBotMetrics = (req, res) => {
    // Placeholder for bot metrics
    // In a real application, you would fetch metrics from a monitoring service
    const metrics = {
        helper: { uptime: "1h", requests: 100, errors: 2 },
        analysis: { uptime: "30m", requests: 50, errors: 0 }
    };
    res.json({ metrics });
};
exports.getBotMetrics = getBotMetrics;
const getBotPerformance = (req, res) => {
    // Placeholder for bot performance data
    // In a real application, you would fetch performance data from a monitoring service
    const performance = {
        helper: { responseTime: "200ms", successRate: "98%" },
        analysis: { responseTime: "150ms", successRate: "99%" }
    };
    res.json({ performance });
};
exports.getBotPerformance = getBotPerformance;
const getBotHealth = (req, res) => {
    // Placeholder for bot health check
    // In a real application, you would perform actual health checks
    const health = {
        helper: { status: "healthy", lastChecked: new Date().toISOString() },
        analysis: { status: "healthy", lastChecked: new Date().toISOString() }
    };
    res.json({ health });
};
exports.getBotHealth = getBotHealth;
const getBotAlerts = (req, res) => {
    // Placeholder for bot alerts
    // In a real application, you would fetch alerts from a monitoring service
    const alerts = [
        { timestamp: new Date().toISOString(), message: "High CPU usage detected" },
        { timestamp: new Date().toISOString(), message: "Memory leak in analysis bot" }
    ];
    res.json({ alerts });
};
exports.getBotAlerts = getBotAlerts;
const getBotNotifications = (req, res) => {
    // Placeholder for bot notifications
    // In a real application, you would fetch notifications from a notification service
    const notifications = [
        { timestamp: new Date().toISOString(), message: "New update available for helper bot" },
        { timestamp: new Date().toISOString(), message: "Analysis bot completed processing" }
    ];
    res.json({ notifications });
};
exports.getBotNotifications = getBotNotifications;
