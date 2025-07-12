"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = exports.updateActivity = exports.getUserActivities = void 0;
const getUserActivities = async (req, res) => {
    try {
        const { uid } = req.params;
        const snapshot = await db.collection('activities')
            .where('uid', '==', uid)
            .orderBy('createdAt', 'desc')
            .get();
        const activities = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        res.status(200).json({ success: true, activities });
    }
    catch (error) {
        console.error('Get Activities Error:', error);
        res.status(500).json({ success: false, message: 'Error fetching activities' });
    }
};
exports.getUserActivities = getUserActivities;
const updateActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, description } = req.body;
        const activityRef = db.collection('activities').doc(id);
        await activityRef.update({
            type,
            description,
            updatedAt: new Date().toISOString()
        });
        res.status(200).json({ success: true, message: 'Activity updated' });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Error updating activity' });
    }
};
exports.updateActivity = updateActivity;
const logActivity = async ({ uid, type, description, metadata = {} }) => {
    try {
        const activityRef = db.collection('activities').doc();
        await activityRef.set({
            uid,
            type,
            description,
            metadata,
            createdAt: new Date().toISOString()
        });
    }
    catch (error) {
        console.error('Log Activity Error:', error);
    }
};
exports.logActivity = logActivity;
