const express = require('express');
const aiController = require('../controllers/ai.controller');
const Review = require('../models/review.model');

const router = express.Router();

router.post("/get-review", aiController.getReview);

router.get("/history", async (req, res) => {
    try {
        const reviews = await Review.find()
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch history" });
    }
});

module.exports = router;