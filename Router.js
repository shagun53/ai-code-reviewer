const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("All Products");
});

router.get("/:id", (req, res) => {
    res.send(`Product ${req.params.id}`);
});

module.exports = router;