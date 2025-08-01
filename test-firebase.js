const admin = require("./config/firebaseAdmin");

async function testFirebaseConnection() {
  try {
    console.log("Testing Firebase connection...");
    
    // Test Firestore connection
    const db = admin.firestore();
    console.log("Firestore project ID:", db.projectId);
    
    // Try to create a test document
    const testCollection = db.collection("test");
    const testDoc = await testCollection.add({
      test: true,
      timestamp: new Date()
    });
    console.log("Test document created with ID:", testDoc.id);
    
    // Clean up test document
    await testDoc.delete();
    console.log("Test document deleted");
    
    console.log("✅ Firebase connection successful!");
    
    // Test stories collection
    const storiesCollection = db.collection("stories");
    console.log("Stories collection ready");
    
  } catch (error) {
    console.error("❌ Firebase connection failed:", error);
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
  }
}

testFirebaseConnection(); 