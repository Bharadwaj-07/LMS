const express = require('express');
const router = express.Router();
const Marks = require('../models/MarksModel');

router.post('/', async (req, res) => {
    const { userId, classId, test1, test2, endSem } = req.body;

    if (!userId || !classId) {
        return res.status(400).json({ message: 'userId and classId are required.' });
    }

    try {
        const updatedMarks = await Marks.findOneAndUpdate(
            { userId, classId },
            { $set: { test1, test2, endSem } },
            { new: true, upsert: true }
        );

        res.status(201).json({
            message: 'Marks added/updated successfully',
            data: updatedMarks,
        });
    } catch (error) {
        console.error('Error posting marks:', error);
        res.status(500).json({ message: 'Failed to add/update marks', error: error.message });
    }
});

// GET: Get all marks for a specific class
router.get('/class/:classId', async (req, res) => {
    const { classId } = req.params;

    try {
        const marks = await Marks.find({ classId }).populate('userId', 'username');

        if (!marks || marks.length === 0) {
            return res.status(404).json({ message: 'No marks found for this class' });
        }

        res.status(200).json({
            message: 'Marks retrieved successfully',
            data: marks,
        });
    } catch (error) {
        console.error('Error fetching marks:', error);
        res.status(500).json({ message: 'Failed to fetch marks', error: error.message });
    }
});

// GET: Get marks for a specific student
router.get('/student/:userId/:classId', async (req, res) => {
    const { userId, classId } = req.params;

    try {
        const marks = await Marks.find({ userId, classId });

        if (!marks || marks.length === 0) {
            return res.status(404).json({ message: 'No marks found for this student' });
        }

        res.status(200).json({
            message: 'Marks retrieved successfully',
            data: marks,
        });
    } catch (error) {
        console.error('Error fetching marks:', error);
        res.status(500).json({ message: 'Failed to fetch marks', error: error.message });
    }
});

module.exports = router;
