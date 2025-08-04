const admin = require("./config/firebaseAdmin");

// Function to set admin custom claim for a user
const setAdminClaim = async (uid, isAdmin = true) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: isAdmin });
    console.log(`✅ Custom claim set for ${uid}: admin = ${isAdmin}`);
    
    // Verify the claim was set
    const user = await admin.auth().getUser(uid);
    console.log(`📋 User ${uid} custom claims:`, user.customClaims);
    
    return true;
  } catch (error) {
    console.error(`❌ Error setting custom claim for ${uid}:`, error.message);
    return false;
  }
};

// Function to remove admin claim
const removeAdminClaim = async (uid) => {
  return setAdminClaim(uid, false);
};

// Function to list all users with admin claims
const listAdminUsers = async () => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    const adminUsers = listUsersResult.users.filter(user => 
      user.customClaims && user.customClaims.admin
    );
    
    console.log(`\n👥 Found ${adminUsers.length} admin users:`);
    adminUsers.forEach(user => {
      console.log(`- ${user.email} (${user.uid})`);
    });
    
    return adminUsers;
  } catch (error) {
    console.error('❌ Error listing admin users:', error.message);
    return [];
  }
};

// Main execution
const main = async () => {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'set':
      if (!args[1]) {
        console.log('❌ Usage: node setAdmin.js set <UID>');
        process.exit(1);
      }
      await setAdminClaim(args[1], true);
      break;
      
    case 'remove':
      if (!args[1]) {
        console.log('❌ Usage: node setAdmin.js remove <UID>');
        process.exit(1);
      }
      await removeAdminClaim(args[1]);
      break;
      
    case 'list':
      await listAdminUsers();
      break;
      
    default:
      console.log(`
🔐 Diagno Admin Management Script

Usage:
  node setAdmin.js set <UID>     - Grant admin access to user
  node setAdmin.js remove <UID>  - Remove admin access from user
  node setAdmin.js list          - List all admin users

Examples:
  node setAdmin.js set abc123def456
  node setAdmin.js remove abc123def456
  node setAdmin.js list
      `);
  }
  
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled error:', error);
  process.exit(1);
});

main(); 