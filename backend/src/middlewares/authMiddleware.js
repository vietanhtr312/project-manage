const InvalidCredentialsError = require("../errors/InvalidCredentialsError");
const jwtUtils = require("../utils/jwtUtils");


// Middleware to protect routes that require authentication 
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new InvalidCredentialsError("Invalid token.");
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwtUtils.verifyToken(token);
        if (!decoded) {
            throw new InvalidCredentialsError("Invalid token.");
        }

        const user = await User.findById(decoded.id).select('-password_hash');
        if (!user) {
            throw new InvalidCredentialsError("User not found, authorization denied.");
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
