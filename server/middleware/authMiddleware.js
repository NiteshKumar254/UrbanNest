

 
// import User from "../models/User.js";

// // Middleware to check if user is authenticated
// export const protect = async (req, res, next) => {
//     const { userId } = req.auth();
//     if (!userId) {
//         res.json({ success: false, message: "not authenticated" });
//     } else {
//         const user = await User.findById(userId);
//         req.user = user;
//         next();
//     }
// }

import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
    try {
        // ✅ FIX: Call req.auth **only if it exists**
        const auth = req.auth || (() => ({}));
        const { userId } = auth();

        if (!userId) {
            return res.json({ success: false, message: "not authenticated" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found on request" });
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("Auth Middleware Error:", err.message);
        res.status(500).json({ success: false, message: "Server error in auth middleware" });
    }
};

