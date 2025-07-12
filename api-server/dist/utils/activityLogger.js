"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = void 0;
const firebase_js_1 = require("../firebase/firebase.js");
const logActivity = async ({ uid, type, description, docId = null }) => {
    const timestamp = new Date().toISOString();
    await firebase_js_1.db.collection('activities').add({
        uid,
        type,
        description,
        createdAt: timestamp,
        updatedAt: timestamp,
    });
};
exports.logActivity = logActivity;
