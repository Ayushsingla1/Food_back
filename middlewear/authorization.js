const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.Authi = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace("Bearer ", "");

        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Token is not present"
            });
        }

        try {
            console.log("Verifying token...");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = decoded;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during authentication"
        });
    }
};
