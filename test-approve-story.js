const admin = require("./config/firebaseAdmin");

async function approveStory(storyId) {
  try {
    console.log("Approving story with ID:", storyId);
    
    const db = admin.firestore();
    const storyRef = db.collection("stories").doc(storyId);
    
    // Check if story exists
    const storyDoc = await storyRef.get();
    if (!storyDoc.exists) {
      console.log("❌ Story not found!");
      return;
    }
    
    console.log("📖 Found story:", storyDoc.data());
    
    // Update status to approved
    await storyRef.update({ status: "approved" });
    console.log("✅ Story approved successfully!");
    
    // Get updated story
    const updatedDoc = await storyRef.get();
    console.log("📖 Updated story:", updatedDoc.data());
    
  } catch (error) {
    console.error("❌ Error approving story:", error);
  }
}

// Use the story ID you provided
const storyId = "y37sh3YmKx6i0nJ0ZkXH";
approveStory(storyId); 