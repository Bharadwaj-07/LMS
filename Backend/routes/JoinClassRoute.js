const express = require('express');
const router = express.Router();
const JoinClass = require('../models/JoinClassModel');

router.post('/join', async (req, res) => {
    const { userId, classId, username } = req.body;
    console.log("join post router")
    console.log(req.body)

    if (!userId || !classId || !username) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        console.log("hello")
        const newJoin = new JoinClass({ userId, classId, username });
        console.log(newJoin)
        const savedJoin = await newJoin.save();

        res.status(201).json({
            message: 'User successfully joined the class',
            data: savedJoin,
        });
    } catch (error) {
        console.error('Error joining class:', error);
        res.status(500).json({ message: 'Failed to join class', error: error.message });
    }
});

router.get('/class/:classId', async (req, res) => {
    const { classId } = req.params;

    try {
        const usersInClass = await JoinClass.find({ classId }).populate('userId', 'username');

        if (!usersInClass || usersInClass.length === 0) {
            return res.status(404).json({ message: 'No users found in this class' });
        }

        res.status(200).json({
            message: 'Users retrieved successfully',
            data: usersInClass,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

module.exports = router;
