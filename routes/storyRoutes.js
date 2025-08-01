const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const verifyToken = require("../middlewares/authMiddleware");

// Public APIs
router.post("/stories", storyController.submitStory);
router.get("/stories", storyController.getApprovedStories);

// Admin APIs (protected)
router.patch("/stories/:id/status", verifyToken, storyController.updateStoryStatus);
router.delete("/stories/:id", verifyToken, storyController.deleteStory);

module.exports = router; 