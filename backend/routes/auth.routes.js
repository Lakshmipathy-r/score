import express from 'express';
import admin from '../firebase.js';

const router = express.Router();

// POST /api/auth/verify
// Verifies a Firebase ID token and returns the user's role from Firestore.
// Role is stored in the Firestore 'users' collection (set during registration).
router.post('/verify', async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
        }

        const token = authHeader.split('Bearer ')[1];

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid } = decodedToken;

        // Fetch the user's role from Firestore (all roles are stored there)
        const userDoc = await admin.firestore().collection('users').doc(uid).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User profile not found' });
        }

        const { role } = userDoc.data();
        return res.json({ role: role || null });

    } catch (error) {
        console.error('Auth verification error:', error);
        return res.status(401).json({ error: 'Unauthorized: ' + error.message });
    }
});

export default router;
