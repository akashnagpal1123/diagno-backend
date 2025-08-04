const admin = require("../config/firebaseAdmin");

module.exports = async function (req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.split("Bearer ")[1];
  
  if (!token) {
    return res.status(401).json({ 
      error: "Unauthorized: No token provided",
      message: "Please log in to access this resource"
    });
  }

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    
    // Check if user has admin custom claim
    if (!decoded.admin) {
      return res.status(403).json({ 
        error: "Forbidden: Admin access required",
        message: "You don't have permission to access this resource"
      });
    }
    
    // Add user info to request object
    req.user = {
      uid: decoded.uid,
      email: decoded.email,
      admin: decoded.admin,
      ...decoded
    };
    
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ 
      error: "Invalid or expired token",
      message: "Please log in again"
    });
  }
}; 