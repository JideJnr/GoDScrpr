import { db } from '../firebase/firebase.js';

export const logActivity = async ({ uid, type, description, docId = null }) => {
  const timestamp = new Date().toISOString();

    await db.collection('activities').add({
      uid,
      type,
      description,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  
};
