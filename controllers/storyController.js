const storyCollection = require("../models/storyModel");

// Submit new story
exports.submitStory = async (req, res) => {
  const { title, summary, sourceLink, tags } = req.body;

  if (!title || !summary || !sourceLink) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("Attempting to add story to Firestore...");
    const doc = await storyCollection.add({
      title,
      summary,
      sourceLink,
      tags: tags || [],
      createdAt: new Date(),
      status: "pending",
    });
    console.log("Story added successfully with ID:", doc.id);
    res.status(201).json({ id: doc.id, message: "Story submitted for review" });
  } catch (err) {
    console.error("Error adding story:", err);
    res.status(500).json({ 
      error: err.message,
      code: err.code,
      details: err.details 
    });
  }
};

// Get only approved stories
exports.getApprovedStories = async (req, res) => {
  try {
    const snapshot = await storyCollection.where("status", "==", "approved").orderBy("createdAt", "desc").get();
    const stories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve / Reject Story
exports.updateStoryStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    await storyCollection.doc(id).update({ status });
    res.json({ message: `Story marked as ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a story
exports.deleteStory = async (req, res) => {
  const { id } = req.params;

  try {
    await storyCollection.doc(id).delete();
    res.json({ message: "Story deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 