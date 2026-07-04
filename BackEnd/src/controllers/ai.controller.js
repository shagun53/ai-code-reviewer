const aiService = require("../services/ai.service");
const Review = require("../models/review.model");

module.exports.getReview = async (req, res) => {

    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Code is required");
    }

    try {
        const review = await aiService(code);

        // Save to MongoDB
        await Review.create({
            code,
            review,
            language: review.language || 'unknown'
        });

        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to generate review" });
    }
}