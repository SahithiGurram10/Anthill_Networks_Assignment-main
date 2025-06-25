const jwt = require("jsonwebtoken");

exports.authMiddleware = (role) => (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Missing or incorrect Authorization header");
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.replace("Bearer ", "").trim();
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            return res.status(403).json({ message: "Forbidden" });
        }


        if (role && user.role !== role) {
            console.log(`Access denied! Required: ${role}, Found: ${user.role}`);
            return res.status(403).json({ message: "Access denied" });
        }

        req.user = user;
        next();
    });
};
