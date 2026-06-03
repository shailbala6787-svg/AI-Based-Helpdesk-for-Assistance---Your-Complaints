import { verifyToken } from '../utils/jwt.js';
import { fail } from '../utils/envelope.js';
export function authMiddleware(req, res, next) {
    const token = req.cookies?.authorization;
    if (!token) {
        fail(res, 'Authentication required', 401);
        return;
    }
    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
    }
    catch {
        fail(res, 'Invalid or expired token', 401);
    }
}
//# sourceMappingURL=auth.js.map