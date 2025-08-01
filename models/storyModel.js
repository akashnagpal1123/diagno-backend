const admin = require("../config/firebaseAdmin");
const db = admin.firestore();
const storyCollection = db.collection("stories");

// Test the connection
console.log("Firestore initialized for project:", db.projectId);

module.exports = storyCollection; 