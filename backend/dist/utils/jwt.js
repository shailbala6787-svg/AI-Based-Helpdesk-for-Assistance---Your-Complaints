import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';
import { JWT_EXPIRY } from '../constants/enums.js';
export function signToken(payload) {
    return jwt.sign(payload, config.jwtSecret, { expiresIn: JWT_EXPIRY });
}
export function verifyToken(token) {
    return jwt.verify(token, config.jwtSecret);
}
//# sourceMappingURL=jwt.js.map