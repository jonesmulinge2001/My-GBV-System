const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Submit a message
router.post('/send', (req, res) => {
    const { fullName, email, message } = req.body;
    if (!fullName || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const query = 'INSERT INTO messages (fullName, email, message) VALUES (?, ?, ?)';
    db.query(query, [fullName, email, message], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Message sent successfully' });
    });
});

// Fetch all messages (Admin only)
router.get('/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Respond to a message
router.post('/respond/:id', (req, res) => {
    const { response } = req.body;
    const messageId = req.params.id;
    if (!response) {
        return res.status(400).json({ error: 'Response is required' });
    }

    // Check if the message exists before updating
    const checkQuery = 'SELECT * FROM messages WHERE id = ?';
    db.query(checkQuery, [messageId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Update the message with a response
        const updateQuery = 'UPDATE messages SET response = ?, responded_at = NOW() WHERE id = ?';
        db.query(updateQuery, [response, messageId], (updateErr, result) => {
            if (updateErr) return res.status(500).json({ error: updateErr.message });
            res.json({ message: 'Response sent successfully' });
        });
    });
});

module.exports = router;
